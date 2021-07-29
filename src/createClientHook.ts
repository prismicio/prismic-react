import * as React from "react";
import * as prismic from "@prismicio/client";

import { usePrismicClient } from "./usePrismicClient";

type PrismicClientError =
	| prismic.PrismicError
	| prismic.ParsingError
	| prismic.ForbiddenError;

export const enum PrismicHookState {
	IDLE,
	PENDING,
	SUCCEEDED,
	FAILED,
}

export type StateMachineState<TData> = {
	state: PrismicHookState;
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
	if (action[0] === "start") {
		return { state: PrismicHookState.PENDING };
	} else if (action[0] === "succeed") {
		return { state: PrismicHookState.SUCCEEDED, data: action[1] };
	} else if (action[0] === "fail") {
		return { ...state, state: PrismicHookState.FAILED, error: action[1] };
	}

	return state;
};

const initialState = { state: PrismicHookState.IDLE } as const;

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type ClientPrototype = typeof prismic.Client.prototype;

export type ClientMethodParameters<MethodName extends keyof ClientPrototype> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ClientPrototype[MethodName] extends (...args: any[]) => any
		? Parameters<ClientPrototype[MethodName]>
		: never;

export type HookOnlyParameters = {
	client?: prismic.Client;
};

const getParamHookDependencies = (
	params: ClientMethodParameters<"get">[0] = {},
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
 * Determiens if a value is a `@prismicio/client` params object.
 *
 * @param value The value to check.
 *
 * @return `true` if `value` is a `@prismicio/client` params object, `false` otherwise.
 */
const isParams = (
	value: unknown,
): value is ClientMethodParameters<"get">[0] & HookOnlyParameters => {
	// This is a *very* naive check.
	return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * Creates a React hook that forwards arguments to a specific method of a `@prismicio/client` instance. The created hook has its own internal state manager to report async status, such as pending or error statuses.
 *
 * @param method The `@prismicio/client` method to which hook arguments will be forwarded.
 *
 * @returns A new React hook configured for the provided method.
 *
 * @internal
 */
export const createClientHook = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TMethod extends (...args: any[]) => Promise<any>,
	TArgs extends Parameters<TMethod>,
>(
	method: TMethod,
) => {
	return (
		...args: TArgs
	): [
		data: StateMachineState<UnwrapPromise<ReturnType<TMethod>>>["data"],
		state: Pick<
			StateMachineState<UnwrapPromise<ReturnType<TMethod>>>,
			"state" | "error"
		>,
	] => {
		const lastArg = args[args.length - 1];
		const { client: explicitClient, ...params } = isParams(lastArg)
			? lastArg
			: ({} as HookOnlyParameters);
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
				dispatch(["start"]);
				method
					.call(client, ...argsWithoutParams, params)
					.then((result) => dispatch(["succeed", result]))
					.catch((error) => dispatch(["fail", error]));
			},
			// We must disable exhaustive-deps to optimize providing `params` deps.
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[client, ...args.slice(0, -1), ...getParamHookDependencies(params)],
		);

		return React.useMemo(
			() => [state.data, { state: state.state, error: state.error }],
			[state],
		);
	};
};
