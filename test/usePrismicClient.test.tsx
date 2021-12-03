/* eslint-disable react/display-name  */
/* eslint-disable react/prop-types */

import test from "ava";
import * as React from "react";
import * as sinon from "sinon";
import { renderHook, cleanup } from "@testing-library/react-hooks";

import { createClient } from "./__testutils__/createClient";

import { PrismicProvider, usePrismicClient } from "../src";

// Supress React logs when errors are thrown.
test.before(() => {
	console.error = sinon.stub();
});

// We must clean up after each test. We also must run each test serially to
// ensure the clean up process only occurs between tests.
test.afterEach(() => {
	cleanup();
});

test.serial("returns the client provided to PrismicProvider", (t) => {
	const client = createClient(t);

	const { result } = renderHook(() => usePrismicClient(), {
		wrapper: (props) => (
			<PrismicProvider client={client}>{props.children}</PrismicProvider>
		),
	});

	t.is(result.current, client);
});

test.serial(
	"returns the client provided to the hook, ignoring the client provided to PrismicProvider",
	(t) => {
		const providerClient = createClient(t);
		const hookClient = createClient(t);

		const { result } = renderHook(() => usePrismicClient(hookClient), {
			wrapper: (props) => (
				<PrismicProvider client={providerClient}>
					{props.children}
				</PrismicProvider>
			),
		});

		t.is(result.current, hookClient);
	},
);

test.serial(
	"returns the client provided to the hook even if a client was not provided to PrismicProvider",
	(t) => {
		const client = createClient(t);

		const { result } = renderHook(() => usePrismicClient(client), {
			wrapper: (props) => <PrismicProvider>{props.children}</PrismicProvider>,
		});

		t.is(result.current, client);
	},
);

test.serial(
	"throws if a client is not provided to the hook or PrismicProvider",
	(t) => {
		const { result } = renderHook(() => usePrismicClient(), {
			wrapper: (props) => <PrismicProvider>{props.children}</PrismicProvider>,
		});

		if (result.error instanceof Error) {
			t.regex(result.error.message, /provide a client/i);
		} else {
			t.fail("An error was not thrown");
		}
	},
);
