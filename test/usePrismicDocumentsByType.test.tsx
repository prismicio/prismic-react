// @vitest-environment happy-dom

import { it, expect, afterEach } from "vitest";
import * as React from "react";
import * as prismic from "@prismicio/client";
import { renderHook, cleanup, waitFor } from "@testing-library/react";
import * as assert from "node:assert";

import { createTestClient } from "./__testutils__/createTestClient";
import { mockPrismicRestAPIV2 } from "./__testutils__/mockPrismicRestAPIV2";

import { PrismicProvider, usePrismicDocumentsByType } from "../src";

afterEach(() => {
	cleanup();
});

const createWrapper = (client: prismic.Client): React.ComponentType => {
	// eslint-disable-next-line react/display-name
	return (props) => <PrismicProvider client={client} {...props} />;
};

it("returns matching documents", async (ctx) => {
	const client = createTestClient();

	const model = ctx.mock.model.customType();
	const docs = Array(3)
		.fill(undefined)
		.map(() => ctx.mock.value.document({ model }));
	const type = model.id;
	const queryResponse = ctx.mock.api.query({
		documents: docs,
	});

	mockPrismicRestAPIV2({
		ctx,
		queryResponse,
		queryRequiredParams: {
			q: [`[${prismic.predicate.at("document.type", type)}]`],
		},
	});

	const { result } = renderHook(() => usePrismicDocumentsByType(type), {
		wrapper: createWrapper(client),
	});

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(result.current[0]).toStrictEqual(queryResponse);
});

it("supports params", async (ctx) => {
	const client = createTestClient();

	const params = {
		pageSize: 2,
	};

	const model = ctx.mock.model.customType();
	const docs = Array(3)
		.fill(undefined)
		.map(() => ctx.mock.value.document({ model }));
	const type = model.id;
	const queryResponse = ctx.mock.api.query({
		documents: docs,
		pageSize: params.pageSize,
	});

	mockPrismicRestAPIV2({
		ctx,
		queryResponse,
		queryRequiredParams: {
			q: [`[${prismic.predicate.at("document.type", type)}]`],
		},
	});

	const { result } = renderHook(() => usePrismicDocumentsByType(type, params), {
		wrapper: createWrapper(client),
	});

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(result.current[0]).toStrictEqual(queryResponse);
});

it("supports explicit client", async (ctx) => {
	const client = createTestClient();

	const model = ctx.mock.model.customType();
	const docs = Array(3)
		.fill(undefined)
		.map(() => ctx.mock.value.document({ model }));
	const type = model.id;
	const queryResponse = ctx.mock.api.query({
		documents: docs,
	});

	mockPrismicRestAPIV2({
		ctx,
		queryResponse,
		queryRequiredParams: {
			q: [`[${prismic.predicate.at("document.type", type)}]`],
		},
	});

	const { result } = renderHook(() =>
		usePrismicDocumentsByType(type, { client }),
	);

	await waitFor(() => {
		assert.equal(result.current[1].state, "loaded");
	});

	expect(result.current[0]).toStrictEqual(queryResponse);
});

it("returns failed state on error", async (ctx) => {
	const client = createTestClient();

	mockPrismicRestAPIV2({
		ctx,
		accessToken: "invalid-token",
	});

	const { result } = renderHook(() => usePrismicDocumentsByType("type"), {
		wrapper: createWrapper(client),
	});

	await waitFor(() => {
		assert.equal(result.current[1].state, "failed");
	});

	expect(result.current[1].error).instanceOf(prismic.ForbiddenError);
	expect(result.current[0]).toBe(undefined);
});
