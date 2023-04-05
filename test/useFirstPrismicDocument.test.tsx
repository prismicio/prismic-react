// @vitest-environment happy-dom

import { it, expect, afterEach } from "vitest";
import * as React from "react";
import * as prismic from "@prismicio/client";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import * as assert from "node:assert";

import { createTestClient } from "./__testutils__/createTestClient";
import { mockPrismicRestAPIV2 } from "./__testutils__/mockPrismicRestAPIV2";

import { PrismicProvider, useFirstPrismicDocument } from "../src";

afterEach(() => {
	cleanup();
});

const createWrapper = (client: prismic.Client): React.ComponentType => {
	// eslint-disable-next-line react/display-name
	return (props) => <PrismicProvider client={client} {...props} />;
};

it("returns document with matching ID", async (ctx) => {
	const client = createTestClient();

	const doc = ctx.mock.value.document();

	mockPrismicRestAPIV2({
		ctx,
		queryResponse: ctx.mock.api.query({
			documents: [doc],
		}),
		queryRequiredParams: {
			pageSize: "1",
		},
	});

	const { result } = renderHook(() => useFirstPrismicDocument(), {
		wrapper: createWrapper(client),
	});

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(result.current[0]).toStrictEqual(doc);
});

it("supports params", async (ctx) => {
	const client = createTestClient();

	const doc = ctx.mock.value.document();

	const params = {
		pageSize: 2,
	};

	mockPrismicRestAPIV2({
		ctx,
		queryResponse: ctx.mock.api.query({
			documents: [doc],
		}),
		queryRequiredParams: {
			pageSize: params.pageSize.toString(),
		},
	});

	const { result } = renderHook(() => useFirstPrismicDocument(params), {
		wrapper: createWrapper(client),
	});

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(result.current[0]).toStrictEqual(doc);
});

it("supports explicit client", async (ctx) => {
	const client = createTestClient();

	const doc = ctx.mock.value.document();

	mockPrismicRestAPIV2({
		ctx,
		queryResponse: ctx.mock.api.query({
			documents: [doc],
		}),
		queryRequiredParams: {
			pageSize: "1",
		},
	});

	const { result } = renderHook(() => useFirstPrismicDocument({ client }));

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(result.current[0]).toStrictEqual(doc);
});

it("returns failed state on error", async (ctx) => {
	const client = createTestClient();

	mockPrismicRestAPIV2({
		ctx,
		accessToken: "invalid-token",
	});

	const { result } = renderHook(() => useFirstPrismicDocument(), {
		wrapper: createWrapper(client),
	});

	await waitFor(() => {
		assert.equal(result.current[1].state, "failed");
	});

	expect(result.current[1].error).instanceOf(prismic.ForbiddenError);
	expect(result.current[0]).toBe(undefined);
});
