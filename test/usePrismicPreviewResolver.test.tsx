// @vitest-environment happy-dom

import { it, expect, afterEach, vi } from "vitest";
import * as React from "react";
import * as prismic from "@prismicio/client";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import * as assert from "node:assert";

import { createTestClient } from "./__testutils__/createTestClient";
import { mockPrismicRestAPIV2 } from "./__testutils__/mockPrismicRestAPIV2";

import { PrismicProvider, usePrismicPreviewResolver } from "../src";

afterEach(() => {
	cleanup();
});

const createWrapper = (client: prismic.Client): React.ComponentType => {
	// eslint-disable-next-line react/display-name
	return (props) => <PrismicProvider client={client} {...props} />;
};

it("returns a resolved preview URL", async (ctx) => {
	const client = createTestClient();

	const doc = ctx.mock.value.document({ withURL: true });
	const ref = ctx.mock.api.ref({ isMasterRef: false });

	mockPrismicRestAPIV2({
		ctx,
		queryResponse: ctx.mock.api.query({
			documents: [doc],
		}),
		queryRequiredParams: {
			ref: ref.ref,
			q: [`[${prismic.predicate.at("document.id", doc.id)}]`],
			lang: "*",
			pageSize: "1",
		},
	});

	const { result } = renderHook(
		() =>
			usePrismicPreviewResolver({
				documentID: doc.id,
				previewToken: ref.ref,
			}),
		{ wrapper: createWrapper(client) },
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(result.current[0]).toBe(doc.url);
});

it("navigates if a navigate function is provided", async (ctx) => {
	const client = createTestClient();

	const doc = ctx.mock.value.document({ withURL: true });
	const ref = ctx.mock.api.ref({ isMasterRef: false });

	const navigate = vi.fn();

	mockPrismicRestAPIV2({
		ctx,
		queryResponse: ctx.mock.api.query({
			documents: [doc],
		}),
		queryRequiredParams: {
			ref: ref.ref,
			q: [`[${prismic.predicate.at("document.id", doc.id)}]`],
			lang: "*",
			pageSize: "1",
		},
	});

	const { result } = renderHook(
		() =>
			usePrismicPreviewResolver({
				documentID: doc.id,
				previewToken: ref.ref,
				navigate,
			}),
		{ wrapper: createWrapper(client) },
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(navigate).toHaveBeenCalledWith(doc.url);
});

it("supports explicit client", async (ctx) => {
	const client = createTestClient();

	const doc = ctx.mock.value.document({ withURL: true });
	const ref = ctx.mock.api.ref({ isMasterRef: false });

	mockPrismicRestAPIV2({
		ctx,
		queryResponse: ctx.mock.api.query({
			documents: [doc],
		}),
		queryRequiredParams: {
			ref: ref.ref,
			q: [`[${prismic.predicate.at("document.id", doc.id)}]`],
			lang: "*",
			pageSize: "1",
		},
	});

	const { result } = renderHook(() =>
		usePrismicPreviewResolver({
			documentID: doc.id,
			previewToken: ref.ref,
			client,
		}),
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(result.current[0]).toBe(doc.url);
});

it("returns failed state on error", async (ctx) => {
	const client = createTestClient();

	mockPrismicRestAPIV2({
		ctx,
		accessToken: "invalid-token",
	});

	const { result } = renderHook(
		() =>
			usePrismicPreviewResolver({
				documentID: "documentID",
				previewToken: "previewToken",
			}),
		{ wrapper: createWrapper(client) },
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "failed");
	});

	expect(result.current[1].error).instanceOf(prismic.ForbiddenError);
	expect(result.current[0]).toBe(undefined);
});
