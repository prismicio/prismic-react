import type * as prismic from "@prismicio/client";

import * as React from "react";

import { PrismicClientHookState } from "./types";
import { usePrismicClient } from "./usePrismicClient";

type StateMachineState<TData> = {
	state: PrismicClientHookState;
	data?: TData;
	error?: Error;
};

type StateMachineAction<TData> =
	| [type: "start"]
	| [type: "succeed", payload: TData]
	| [type: "fail", payload: Error];

const reducer = <TData>(
	state: StateMachineState<TData>,
	action: StateMachineAction<TData>,
): StateMachineState<TData> => {
	switch (action[0]) {
		case "start": {
			return { state: "loading" };
		}

		case "succeed": {
			return { state: "loaded", data: action[1] };
		}

		case "fail": {
			return {
				...state,
				state: "failed",
				error: action[1],
			};
		}
	}
};

const initialState: StateMachineState<never> = {
	state: "idle",
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type ClientPrototype = typeof prismic.Client.prototype;

type ClientMethod<MethodName extends keyof ClientPrototype> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ClientPrototype[MethodName] extends (...args: any[]) => any
		? ClientPrototype[MethodName]
		: never;

type ClientMethodName = keyof {
	[P in keyof prismic.Client as prismic.Client[P] extends (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...args: any[]
	) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
	Promise<any>
		? P
		: never]: unknown;
};

export type ClientMethodParameters<MethodName extends keyof ClientPrototype> =
	Parameters<ClientMethod<MethodName>>;

export type HookOnlyParameters = {
	client?: prismic.Client;
	skip?: boolean;
};

/**
 * Determines if a value is a `@prismicio/client` params object.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a `@prismicio/client` params object, `false`
 *   otherwise.
 */
const isParams = (
	value: unknown,
): value is ClientMethodParameters<"get">[0] & HookOnlyParameters => {
	// This is a *very* naive check.
	return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * The return value of a `@prismicio/client` React hook.
 *
 * @typeParam TData - Data returned by the client.
 */
export type ClientHookReturnType<TData = unknown> = [
	/**
	 * Data returned by the client.
	 */
	data: TData | undefined,

	/**
	 * The current state of the hook's client method call.
	 */
	state: Pick<StateMachineState<TData>, "state" | "error">,
];

/**
 * Creates a React hook that forwards arguments to a specific method of a
 * `@prismicio/client` instance. The created hook has its own internal state
 * manager to report async status, such as pending or error statuses.
 *
 * @param methodName - The `@prismicio/client` method to which hook arguments
 *   will be forwarded.
 *
 * @returns A new React hook configured for the provided method.
 *
 * @internal
 */
export const useStatefulPrismicClientMethod = <
	TMethodName extends ClientMethodName,
	TArgs extends Parameters<ClientMethod<TMethodName>>,
	TData extends UnwrapPromise<ReturnType<ClientMethod<TMethodName>>>,
>(
	methodName: TMethodName,
	args: TArgs,
	explicitClient?: prismic.Client,
): ClientHookReturnType<TData> => {
	const lastArg = args[args.length - 1];
	const {
		client: lastArgExplicitClient,
		skip,
		...params
	} = isParams(lastArg) ? lastArg : ({} as HookOnlyParameters);
	const argsWithoutParams = isParams(lastArg) ? args.slice(0, -1) : args;

	const client = usePrismicClient(explicitClient || lastArgExplicitClient);

	const [state, dispatch] = React.useReducer<
		React.Reducer<StateMachineState<TData>, StateMachineAction<TData>>
	>(reducer, initialState);

	React.useEffect(
		() => {
			// Used to prevent dispatching an action if the hook was cleaned up.
			let didCancel = false;

			if (!skip) {
				if (!didCancel) {
					dispatch(["start"]);
				}

				client[methodName]
					.call(
						client,
						// @ts-expect-error - Merging method arg types is too complex
						...argsWithoutParams,
						params,
					)
					.then((result) => {
						if (!didCancel) {
							dispatch(["succeed", result as TData]);
						}
					})
					.catch((error) => {
						if (!didCancel) {
							dispatch(["fail", error]);
						}
					});
			}

			// Ensure we don't dispatch an action if the hook is cleaned up.
			() => {
				didCancel = true;
			};
		},
		// We must disable exhaustive-deps since we are using
		// JSON.stringify on params (effectively a deep equality check).
		// We want this effect to run again anytime params change.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			client,
			methodName,
			skip,
			// eslint-disable-next-line react-hooks/exhaustive-deps
			JSON.stringify(argsWithoutParams),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			JSON.stringify(params),
		],
	);

	return React.useMemo(
		() => [
			state.data,
			{
				state: state.state,
				error: state.error,
			},
		],
		[state],
	);
};
