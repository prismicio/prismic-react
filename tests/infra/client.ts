import { APIRequestContext, APIResponse, request } from "playwright/test";
import {
	CustomType,
	SharedSlice,
} from "@prismicio/types-internal/lib/customtypes/index.js";
import { randomUUID } from "node:crypto";
import assert from "node:assert";

type PrismicURLs = { wroom: URL; auth: URL; customtypes: URL };
type RepoURLs = PrismicURLs & { cdn: URL; core: URL };
type Auth = { email: string; password: string };
export type CoreAPIDocument = {
	id: string;
	custom_type_id: string;
	versions: { version_id: string; uid?: string }[];
};

export class Prismic {
	urls: PrismicURLs;
	#auth: AuthenticatedAPI;

	constructor(config: {
		baseURL: string;
		auth: Auth;
		request: APIRequestContext;
	}) {
		const { baseURL, auth, request } = config;
		this.urls = {
			wroom: new URL(baseURL),
			auth: withSubdomain("auth", baseURL),
			customtypes: withSubdomain("customtypes", baseURL),
		};
		this.#auth = new AuthenticatedAPI({ urls: this.urls, auth, request });
	}

	async createRepository(args: { defaultLocale: string; prefix?: string }) {
		const { defaultLocale, prefix = "e2e-tests" } = args;
		const suffix = randomUUID().replace("-", "").slice(0, 16);
		const data = {
			domain: `${prefix}-${suffix}`,
			framework: "vue",
			plan: "personal",
			isAnnual: "false",
			role: "developer",
		};

		const url = new URL("authentication/newrepository", this.urls.wroom);
		const res = await this.#auth.postWroom(url.toString(), { data });
		assert(res.ok, `Could not create repository ${data.domain}.`);

		const repo = this.getRepo(data.domain);
		await repo.setDefaultLocale(defaultLocale);
		return repo;
	}

	getRepo(domain: string) {
		return new Repo({ domain, urls: this.urls, auth: this.#auth });
	}
}

export class Repo {
	readonly domain: string;
	urls: RepoURLs;
	#auth: AuthenticatedAPI;

	constructor(config: {
		domain: string;
		urls: PrismicURLs;
		auth: AuthenticatedAPI;
	}) {
		const { domain, auth, urls } = config;
		this.domain = domain;
		this.urls = {
			...urls,
			wroom: withSubdomain(domain, urls.wroom),
			cdn: withSubdomain(domain, withSubdomain("cdn", urls.wroom)),
			core: new URL("core/", withSubdomain(domain, urls.wroom)),
		};
		this.#auth = auth;
	}

	async setDefaultLocale(locale: string) {
		const url = new URL(
			`app/settings/multilanguages/${locale}/createMasterLang`,
			this.urls.wroom,
		);
		const res = await this.#auth.postWroom(url.toString());
		assert(res.ok, `Could not default locale to ${locale}.`);
	}

	async createPreview(args: { name: string; url: URL }) {
		const { name, url: previewURL } = args;
		const url = new URL("previews/new", this.urls.wroom);
		const data = {
			name,
			websiteURL: previewURL.origin,
			resolverPath: previewURL.pathname,
		};
		const res = await this.#auth.postWroom(url.toString(), { data });
		assert(res.ok, `Could not create preview ${name}.`);
	}

	async getPreviewConfigs(): Promise<
		{ id: string; label: string; url: string }[]
	> {
		const url = new URL("repository/preview_configs", this.urls.core);
		const res = await this.#auth.get(url.toString());
		assert(res.ok, `Could not get preview configs.`);
		const json = await res.json();
		return json.results;
	}

	async createPreviewSession(
		document: CoreAPIDocument,
	): Promise<{ preview_url: string; session_id: string }> {
		const configs = await this.getPreviewConfigs();
		const config = configs[0];
		assert(config, "At least one preview must be configured.");
		const url = new URL("previews/session/draft", this.urls.core);
		url.searchParams.set("previewId", config.id);
		url.searchParams.set("documentId", document.id);
		url.searchParams.set("versionId", document.versions[0].version_id);
		const res = await this.#auth.get(url.toString());
		return await res.json();
	}

	async addCustomType(customType: CustomType) {
		const url = new URL("customtypes/insert", this.urls.customtypes);
		const res = await this.#auth.post(url.toString(), {
			data: customType,
			headers: { repository: this.domain },
		});
		assert(res.ok, "Could not add custom type.");
	}

	async addSlice(slice: SharedSlice) {
		const url = new URL("slices/insert", this.urls.customtypes);
		const res = await this.#auth.post(url.toString(), {
			data: slice,
			headers: { repository: this.domain },
		});
		assert(res.ok, "Could not add slice.");
	}

	async createDocument(document: {
		title: string;
		locale?: string;
		group_lang_id?: string;
		release_id?: string;
		integration_field_ids: string[];
		data: Record<string, unknown>;
		custom_type_id: string;
		tags: string[];
	}): Promise<CoreAPIDocument> {
		const url = new URL("documents", this.urls.core);
		const res = await this.#auth.post(url.toString(), { data: document });
		assert(res.status() === 201, "Could not create draft document.");
		return await res.json();
	}

	async publishDocument(id: string) {
		const url = new URL(`documents/${id}/draft`, this.urls.core);
		const data = { status: "published" };
		const res = await this.#auth.patch(url.toString(), { data });
		assert(res.status() === 204, `Could not publish document ${id}.`);
	}

	async createDocumentDraft(
		document: CoreAPIDocument,
		content: Record<string, unknown>,
	): Promise<CoreAPIDocument> {
		const { uid, version_id } = document.versions[0];
		const url = new URL(`documents/${document.id}/draft`, this.urls.core);
		url.searchParams.set("base_version_id", version_id);
		const data = {
			data: { ...(uid ? { uid } : {}), ...content },
			integration_field_ids: [],
			tags: [],
		};
		const res = await this.#auth.put(url.toString(), { data });
		return res.json();
	}

	async getDocumentByUID(type: string, uid: string) {
		const url = new URL("documents", this.urls.core);
		url.searchParams.set("uid", uid);
		const res = await this.#auth.get(url.toString());
		assert(res.ok, "Could not fetch documents.");
		const json: { results: CoreAPIDocument[] } = await res.json();
		const doc = json.results.find((result) => result.custom_type_id === type);
		assert(doc, `Could not find document with type ${type} and UID ${uid}.`);
		return doc;
	}

	async delete() {
		const res = await this.#unreliableDelete();
		if (!res.ok) {
			// sometimes the deletion returns 500 but actually succeeds
			// we run the query again and check the repo is actually deleted (404)
			const retry = await this.#unreliableDelete();
			assert(!retry.ok, `Could not delete repository ${this.domain}`);
		}
	}

	async #unreliableDelete() {
		const url = new URL("app/settings/delete", this.urls.wroom);
		const data = { confirm: this.domain, password: this.#auth.auth.password };
		return await this.#auth.postWroom(url.toString(), { data });
	}
}

class AuthenticatedAPI {
	urls: PrismicURLs;
	auth: Auth;
	#request: APIRequestContext;
	#wroomRequest: Promise<APIRequestContext>;
	#cachedToken?: string;

	constructor(config: {
		urls: PrismicURLs;
		auth: Auth;
		request: APIRequestContext;
	}) {
		this.urls = config.urls;
		this.auth = config.auth;
		this.#request = config.request;
		this.#wroomRequest = request.newContext();
	}

	async get(...args: Parameters<APIRequestContext["get"]>) {
		const headers = await this.#headers(args[1]?.headers);
		return await this.#request.get(args[0], { ...args[1], headers });
	}

	async post(...args: Parameters<APIRequestContext["post"]>) {
		const headers = await this.#headers(args[1]?.headers);
		return await this.#request.post(args[0], { ...args[1], headers });
	}

	async put(...args: Parameters<APIRequestContext["get"]>) {
		const headers = await this.#headers(args[1]?.headers);
		return await this.#request.put(args[0], { ...args[1], headers });
	}

	async patch(...args: Parameters<APIRequestContext["get"]>) {
		const headers = await this.#headers(args[1]?.headers);
		return await this.#request.patch(args[0], { ...args[1], headers });
	}

	async postWroom(
		...args: Parameters<APIRequestContext["post"]>
	): Promise<APIResponse> {
		const request = await this.#wroomRequest;
		const { cookies } = await request.storageState();
		const auth = cookies.find((cookie) => cookie.name === "prismic-auth");
		if (!auth?.value) {
			await this.#logInWroom();
			return await this.postWroom(...args);
		}

		const url = new URL(args[0]);
		const xsrf = cookies.find((cookie) => cookie.name === "X_XSRF");
		if (xsrf) url.searchParams.set("_", xsrf.value);
		return await request.post(url.toString(), args[1]);
	}

	async #logInWroom() {
		const request = await this.#wroomRequest;
		const url = new URL("/authentication/signin", this.urls.wroom).toString();
		const res = await request.post(url, { data: this.auth });
		assert(res.ok, "Could not log in to Prismic. Check your credentials.");
	}

	async #token() {
		if (this.#cachedToken) return this.#cachedToken;
		const url = new URL("login", this.urls.auth);
		const res = await this.#request.post(url.toString(), { data: this.auth });
		assert(res.ok, "Authentication failed. No token received.");
		return (this.#cachedToken = await res.text());
	}

	async #headers(existingHeaders?: Record<string, string>) {
		const token = await this.#token();
		return { authorization: `Bearer ${token}`, ...existingHeaders };
	}
}

function withSubdomain(subdomain: string, url: URL | string) {
	const newURL = new URL(url);
	newURL.hostname = `${subdomain}.${newURL.hostname}`;
	return newURL;
}
