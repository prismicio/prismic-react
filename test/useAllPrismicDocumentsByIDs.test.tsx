/* eslint-disable react/display-name  */
/* eslint-disable react/prop-types */

import test from "ava";
import * as React from "react";
import * as msw from "msw";
import * as mswNode from "msw/node";
import * as prismic from "@prismicio/client";
import {
	renderHook,
	cleanup,
	waitFor,
	waitForOptions,
} from "@testing-library/react";
import * as assert from "node:assert";

import { createClient } from "./__testutils__/createClient";
import { createMockQueryHandler } from "./__testutils__/createMockQueryHandler";
import { createMockRepositoryHandler } from "./__testutils__/createMockRepositoryHandler";
import { createQueryResponsePages } from "./__testutils__/createQueryResponsePages";
import { createRepositoryResponse } from "./__testutils__/createRepositoryResponse";
import { getMasterRef } from "./__testutils__/getMasterRef";
import { md5 } from "./__testutils__/md5";

import { PrismicProvider, useAllPrismicDocumentsByIDs } from "../src";

const server = mswNode.setupServer();
test.before(() => server.listen({ onUnhandledRequest: "error" }));
test.after(() => server.close());

// We must clean up after each test. We also must run each test serially to
// ensure the clean up process only occurs between tests.
test.afterEach(() => {
	cleanup();
});

const createWrapper = (client: prismic.Client): React.ComponentType => {
	return (props) => <PrismicProvider client={client} {...props} />;
};

const waitForOptions: waitForOptions = {
	timeout: 2000,
};

test.serial("returns documents with matching IDs", async (t) => {
	const client = createClient(t);
	const wrapper = createWrapper(client);
	const repositoryResponse = createRepositoryResponse();
	const queryResponsePages = createQueryResponsePages();
	const documents = queryResponsePages.flatMap((page) => page.results);
	const documentIds = documents.map((doc) => doc.id);
	const ref = getMasterRef(repositoryResponse);

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref,
			q: `[${prismic.predicate.in("document.id", documentIds)}]`,
			pageSize: 100,
		}),
	);

	const { result } = renderHook(
		() => useAllPrismicDocumentsByIDs(documentIds),
		{ wrapper },
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	}, waitForOptions);

	t.deepEqual(result.current[0], documents);
});

test.serial("supports params", async (t) => {
	const client = createClient(t);
	const wrapper = createWrapper(client);
	const repositoryResponse = createRepositoryResponse();
	const queryResponsePages = createQueryResponsePages();
	const documents = queryResponsePages.flatMap((page) => page.results);
	const documentIds = documents.map((doc) => doc.id);
	const ref = getMasterRef(repositoryResponse);

	const params = {
		pageSize: 2,
	};

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref,
			q: `[${prismic.predicate.in("document.id", documentIds)}]`,
			pageSize: params.pageSize.toString(),
		}),
	);

	const { result } = renderHook(
		() => useAllPrismicDocumentsByIDs(documentIds, params),
		{ wrapper },
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	}, waitForOptions);

	t.deepEqual(result.current[0], documents);
});

test.serial("supports explicit client", async (t) => {
	const client = createClient(t);
	const repositoryResponse = createRepositoryResponse();
	const queryResponsePages = createQueryResponsePages();
	const documents = queryResponsePages.flatMap((page) => page.results);
	const documentIds = documents.map((doc) => doc.id);
	const ref = getMasterRef(repositoryResponse);

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref,
			q: `[${prismic.predicate.in("document.id", documentIds)}]`,
			pageSize: 100,
		}),
	);

	const { result } = renderHook(() =>
		useAllPrismicDocumentsByIDs(documentIds, { client }),
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	}, waitForOptions);

	t.deepEqual(result.current[0], documents);
});

test.serial("returns failed state on error", async (t) => {
	const client = createClient(t);
	const wrapper = createWrapper(client);
	const repositoryResponse = {
		message: "invalid access token",
		oauth_initiate: "oauth_initiate",
		oauth_token: "oauth_token",
	};

	server.use(
		msw.rest.get(prismic.getEndpoint(md5(t.title)), (_req, res, ctx) => {
			return res(ctx.status(403), ctx.json(repositoryResponse));
		}),
	);

	const { result } = renderHook(
		() => useAllPrismicDocumentsByIDs(["id", "id2"]),
		{ wrapper },
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "failed");
	}, waitForOptions);

	t.true(result.current[1].error instanceof prismic.ForbiddenError);
	t.is(result.current[0], undefined);
});
