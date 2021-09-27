import * as React from "react";
import * as prismic from "@prismicio/client";

import { PrismicClientHookState } from "./types";
import { usePrismicClient } from "./usePrismicClient";

type PrismicClientError =
	| prismic.PrismicError
	| prismic.ParsingError
	| prismic.ForbiddenError;

type StateMachineState<TData> = {
	state: PrismicClientHookState;
	data?: TData;
	error?: PrismicClientError;
};

type StateMachineAction<TData> =
	| [type: "start"]
	| [type: "succeed", payload: TData]
	| [type: "fail", payload: PrismicClientError];

const reducer = <TData>(
	state: StateMachineState<TData>,
	action: StateMachineAction<TData>,
): StateMachineState<TData> => {
	switch (action[0]) {
		case "start": {
			return { state: PrismicClientHookState.PENDING };
		}

		case "succeed": {
			return { state: PrismicClientHookState.SUCCEEDED, data: action[1] };
		}

		case "fail": {
			return {
				...state,
				state: PrismicClientHookState.FAILED,
				error: action[1],
			};
		}
	}
};

const initialState = { state: PrismicClientHookState.IDLE } as const;

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type ClientPrototype = typeof prismic.Client.prototype;

export type ClientMethodParameters<MethodName extends keyof ClientPrototype> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ClientPrototype[MethodName] extends (...args: any[]) => any
		? Parameters<ClientPrototype[MethodName]>
		: never;

export type HookOnlyParameters = {
	client?: prismic.Client;
	skip?: boolean;
};

const getParamHookDependencies = (
	params: NonNullable<ClientMethodParameters<"get">[0]>,
) => {
	return [
		params.ref,
		params.lang,
		params.page,
		params.after,
		params.fetch,
		params.pageSize,
		params.orderings,
		params.fetchLinks,
		params.graphQuery,
		params.predicates,
		params.accessToken,
	];
};

/**
 * Determines if a value is a `@prismicio/client` params object.
 *
 * @param value - The value to check.
 *
 * @returns `true` if `value` is a `@prismicio/client` params object, `false` otherwise.
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
 * @param method - The `@prismicio/client` method to which hook arguments will
 *   be forwarded.
 *
 * @returns A new React hook configured for the provided method.
 * @internal
 */
export const useStatefulPrismicClientMethod = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TMethod extends (...args: any[]) => Promise<any>,
	TArgs extends Parameters<TMethod>,
	TData extends UnwrapPromise<ReturnType<TMethod>>,
>(
	method: TMethod,
	args: TArgs,
): ClientHookReturnType<TData> => {
	const lastArg = args[args.length - 1];
	const {
		client: explicitClient,
		skip,
		...params
	} = isParams(lastArg) ? lastArg : ({} as HookOnlyParameters);
	const argsWithoutParams = isParams(lastArg) ? args.slice(0, -1) : args;

	const client = usePrismicClient(explicitClient);

	const [state, dispatch] = React.useReducer<
		React.Reducer<
			StateMachineState<UnwrapPromise<ReturnType<TMethod>>>,
			StateMachineAction<UnwrapPromise<ReturnType<TMethod>>>
		>
	>(reducer, initialState);

	React.useEffect(
		() => {
			if (state.state === PrismicClientHookState.IDLE && !skip) {
				dispatch(["start"]);
				method
					.call(client, ...argsWithoutParams, params)
					.then((result) => dispatch(["succeed", result]))
					.catch((error) => dispatch(["fail", error]));
			}
		},
		// We must disable exhaustive-deps to optimize providing `params` deps.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			client,
			state.state,
			skip,
			method,
			// eslint-disable-next-line react-hooks/exhaustive-deps
			...args.slice(0, -1),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			...getParamHookDependencies(params),
		],
	);

	return React.useMemo(
		() => [state.data, { state: state.state, error: state.error }],
		[state],
	);
};
