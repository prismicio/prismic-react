/* oxlint-disable rules-of-hooks */
import {
	type Locator,
	type Page,
	test as base,
	expect,
} from "@playwright/test";
import { createClient } from "@prismicio/client";
import assert from "assert";

import { type CoreAPIDocument, Prismic, type Repo } from "./client";

type Fixtures = {
	prismic: Prismic;
	repo: Repo;
	linkDoc: CoreAPIDocument;
	imageDoc: CoreAPIDocument;
	pageDoc: CoreAPIDocument;
	unpublishedPageDoc: CoreAPIDocument;
	appPage: AppPage;
};

export const test = base.extend<Fixtures>({
	prismic: async ({ page }, use) => {
		const prismic = new Prismic({
			baseURL: "https://prismic.io",
			auth: {
				email: process.env.PLAYWRIGHT_PRISMIC_EMAIL,
				password: process.env.PLAYWRIGHT_PRISMIC_PASSWORD,
			},
			request: page.request,
		});
		await use(prismic);
	},
	repo: async ({ page, prismic, baseURL }, use) => {
		assert(baseURL, "A baseURL must be configured to test Prismic previews.");
		const cookies = await page.context().cookies();
		const repoName = cookies.find((c) => c.name === "repository-name")?.value;
		assert(repoName, "Missing repository-name cookie. Run the setup project.");
		const repo = prismic.getRepo(repoName);
		const url = new URL("api/preview", baseURL);
		await repo.createPreview({ name: url.toString(), url });
		await use(repo);
	},
	pageDoc: async ({ repo }, use) => {
		const document = await repo.getDocumentByUID("page", "published");
		await use(document);
	},
	unpublishedPageDoc: async ({ repo }, use) => {
		const document = await repo.getDocumentByUID("page", "unpublished");
		await use(document);
	},
	appPage: async ({ page, repo }, use) => {
		const appPage = new AppPage(page, repo);
		await use(appPage);
	},
});

class AppPage {
	page: Page;
	repository: Repo;
	toolbarScript: Locator;
	toolbarIframe: Locator;
	toolbar: Locator;
	payload: Locator;

	constructor(page: Page, repository: Repo) {
		this.page = page;
		this.repository = repository;
		this.toolbarScript = page.locator('script[src*="prismic.io/prismic.js"]');
		this.toolbarIframe = page.locator(
			'iframe[src*="prismic.io/prismic-toolbar"][src$="iframe.html"]',
		);
		this.toolbar = page.locator("#prismic-toolbar-v2 .PreviewMenu");
		this.payload = page.getByTestId("payload");
	}

	async goToDocument(document: CoreAPIDocument, pathPrefix = "") {
		const client = createClient(
			new URL("/api/v2", this.repository.urls.cdn).toString(),
			{ routes: [{ type: "page", path: "/:uid" }] },
		);
		const apiDocument = await client.getByID(document.id);
		return await this.page.goto(pathPrefix + apiDocument.url!);
	}

	async preview(document: CoreAPIDocument) {
		const previewSession = await this.repository.createPreviewSession(document);
		await this.page.goto(previewSession.preview_url);
	}

	async exitPreview() {
		const closeButton = this.toolbar.locator("img.Icon.x");
		await closeButton.click();
		await expect(this.toolbar).toHaveCount(0);
	}

	async getToolbarScriptParam(name: string) {
		const src = await this.toolbarScript.getAttribute("src");
		return new URL(src ?? "").searchParams.get(name);
	}
}
