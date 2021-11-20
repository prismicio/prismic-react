/* eslint-disable react/display-name  */
/* eslint-disable react/prop-types */

import test from "ava";
import * as React from "react";
import * as msw from "msw";
import * as mswNode from "msw/node";
import * as sinon from "sinon";
import * as prismic from "@prismicio/client";
import { renderHook, cleanup } from "@testing-library/react-hooks";

import { createClient } from "./__testutils__/createClient";
import { createDocument } from "./__testutils__/createDocument";
import { createMockQueryHandler } from "./__testutils__/createMockQueryHandler";
import { createMockRepositoryHandler } from "./__testutils__/createMockRepositoryHandler";
import { createQueryResponse } from "./__testutils__/createQueryResponse";
import { createRef } from "./__testutils__/createRef";
import { createRepositoryResponse } from "./__testutils__/createRepositoryResponse";
import { md5 } from "./__testutils__/md5";

import { PrismicProvider, usePrismicPreviewResolver } from "../src";

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

test.serial("returns a resolved preview URL", async (t) => {
	const client = createClient(t);
	const wrapper = createWrapper(client);

	const repositoryResponse = createRepositoryResponse();
	const document = createDocument({ url: "preview-url" });
	const queryResponsePages = [createQueryResponse([document])];
	const previewToken = createRef(false).ref;

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref: previewToken,
			q: `[${prismic.predicate.at("document.id", document.id)}]`,
		}),
	);

	const { result, waitForValueToChange } = renderHook(
		() =>
			usePrismicPreviewResolver({
				documentID: document.id,
				previewToken,
			}),
		{ wrapper },
	);

	await waitForValueToChange(() => result.current[1].state === "loaded");

	t.deepEqual(result.current[0], document.url);
});

test.serial("navigates if a navigate function is provided", async (t) => {
	const client = createClient(t);
	const wrapper = createWrapper(client);

	const repositoryResponse = createRepositoryResponse();
	const document = createDocument({ url: "preview-url" });
	const queryResponsePages = [createQueryResponse([document])];
	const previewToken = createRef(false).ref;

	const navigate = sinon.stub();

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref: previewToken,
			q: `[${prismic.predicate.at("document.id", document.id)}]`,
		}),
	);

	const { result, waitForValueToChange } = renderHook(
		() =>
			usePrismicPreviewResolver({
				documentID: document.id,
				previewToken,
				navigate,
			}),
		{ wrapper },
	);

	await waitForValueToChange(() => result.current[1].state === "loaded");

	t.true(navigate.calledWith(document.url));
});

test.serial("supports explicit client", async (t) => {
	const client = createClient(t);

	const repositoryResponse = createRepositoryResponse();
	const document = createDocument({ url: "preview-url" });
	const queryResponsePages = [createQueryResponse([document])];
	const previewToken = createRef(false).ref;

	server.use(
		createMockRepositoryHandler(t, repositoryResponse),
		createMockQueryHandler(t, queryResponsePages, {
			ref: previewToken,
			q: `[${prismic.predicate.at("document.id", document.id)}]`,
		}),
	);

	const { result, waitForValueToChange } = renderHook(() =>
		usePrismicPreviewResolver({
			client,
			documentID: document.id,
			previewToken,
		}),
	);

	await waitForValueToChange(() => result.current[1].state === "loaded");

	t.deepEqual(result.current[0], document.url);
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

	const { result, waitForValueToChange } = renderHook(
		() =>
			usePrismicPreviewResolver({
				documentID: "documentID",
				previewToken: "previewToken",
			}),
		{ wrapper },
	);

	await waitForValueToChange(() => result.current[1].state === "failed");

	t.true(result.current[1].error instanceof prismic.ForbiddenError);
	t.is(result.current[0], undefined);
});
