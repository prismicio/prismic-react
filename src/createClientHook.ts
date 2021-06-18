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
		const params:
			| (ClientMethodParameters<"get">[0] & HookOnlyParameters)
			| undefined = args[args.length - 1];
		const client = usePrismicClient(params?.client);

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
					.apply(client, args)
					.then((result) => dispatch(["succeed", result]))
					.catch((error) => dispatch(["fail", error]));
			},
			// We must disable exhaustive-deps to optimize providing `params` deps.
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[client, ...args.slice(-1), ...getParamHookDependencies(params)],
		);

		return React.useMemo(
			() => [state.data, { state: state.state, error: state.error }],
			[state],
		);
	};
};
