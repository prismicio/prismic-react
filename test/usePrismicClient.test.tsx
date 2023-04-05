// @vitest-environment happy-dom

import { it, expect, afterEach, vi } from "vitest";
import { renderHook, cleanup } from "@testing-library/react";

import { createTestClient } from "./__testutils__/createTestClient";

import { PrismicProvider, usePrismicClient } from "../src";

// // Supress React logs when errors are thrown.
// test.before(() => {
// 	console.error = sinon.stub();
// });

afterEach(() => {
	cleanup();
});

it("returns the client provided to PrismicProvider", () => {
	const client = createTestClient();

	const { result } = renderHook(() => usePrismicClient(), {
		wrapper: (props) => (
			<PrismicProvider client={client}>{props.children}</PrismicProvider>
		),
	});

	expect(result.current).toBe(client);
});

it("returns the client provided to the hook, ignoring the client provided to PrismicProvider", () => {
	const providerClient = createTestClient();
	const hookClient = createTestClient();

	const { result } = renderHook(() => usePrismicClient(hookClient), {
		wrapper: (props) => (
			<PrismicProvider client={providerClient}>
				{props.children}
			</PrismicProvider>
		),
	});

	expect(result.current).toBe(hookClient);
});

it("returns the client provided to the hook even if a client was not provided to PrismicProvider", () => {
	const client = createTestClient();

	const { result } = renderHook(() => usePrismicClient(client), {
		wrapper: (props) => <PrismicProvider>{props.children}</PrismicProvider>,
	});

	expect(result.current).toBe(client);
});

it("throws if a client is not provided to the hook or PrismicProvider", () => {
	const consoleErrorSpy = vi
		.spyOn(globalThis.console, "error")
		.mockImplementation(() => void 0);

	expect(() => {
		renderHook(() => usePrismicClient(), {
			wrapper: (props) => <PrismicProvider>{props.children}</PrismicProvider>,
		});
	}).toThrow(/provide a client/i);

	consoleErrorSpy.mockRestore();
});
