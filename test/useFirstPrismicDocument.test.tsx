/* eslint-disable react/display-name  */
/* eslint-disable react/prop-types */

import test from "ava";
import * as React from "react";
import * as msw from "msw";
import * as mswNode from "msw/node";
import * as prismic from "@prismicio/client";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import * as assert from "node:assert";

import { createClient } from "./__testutils__/createClient";
import { createMockQueryHandler } from "./__testutils__/createMockQueryHandler";
import { createMockRepositoryHandler } from "./__testutils__/createMockRepositoryHandler";
import { createQueryResponsePages } from "./__testutils__/createQueryResponsePages";
import { createRepositoryResponse } from "./__testutils__/createRepositoryResponse";
import { getMasterRef } from "./__testutils__/getMasterRef";
import { md5 } from "./__testutils__/md5";

import { PrismicProvider, useFirstPrismicDocument } from "../src";

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

test.serial("returns first document", async (t) => {
	const client = createClient(t);
	const wrapper = createWrapper(client);
	const repositoryResponse = createRepositoryResponse();
	const queryResponsePages = createQueryResponsePages();
	const ref = getMasterRef(repositoryResponse);

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref,
			pageSize: 1,
		}),
	);

	const { result } = renderHook(() => useFirstPrismicDocument(), { wrapper });

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	t.deepEqual(result.current[0], queryResponsePages[0].results[0]);
});

test.serial("supports params", async (t) => {
	const client = createClient(t);
	const wrapper = createWrapper(client);
	const repositoryResponse = createRepositoryResponse();
	const queryResponsePages = createQueryResponsePages();
	const ref = getMasterRef(repositoryResponse);

	const params = {
		pageSize: 2,
	};

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref,
			pageSize: params.pageSize.toString(),
		}),
	);

	const { result } = renderHook(() => useFirstPrismicDocument(params), {
		wrapper,
	});

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	t.deepEqual(result.current[0], queryResponsePages[0].results[0]);
});

test.serial("supports explicit client", async (t) => {
	const client = createClient(t);
	const repositoryResponse = createRepositoryResponse();
	const queryResponsePages = createQueryResponsePages();
	const ref = getMasterRef(repositoryResponse);

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref,
			pageSize: 1,
		}),
	);

	const { result } = renderHook(() => useFirstPrismicDocument({ client }));

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	t.deepEqual(result.current[0], queryResponsePages[0].results[0]);
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

	const { result } = renderHook(() => useFirstPrismicDocument(), { wrapper });

	await waitFor(() => {
		assert.equal(result.current[1].state, "failed");
	});

	t.true(result.current[1].error instanceof prismic.ForbiddenError);
	t.is(result.current[0], undefined);
});
