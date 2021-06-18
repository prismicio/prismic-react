import * as React from "react";
import * as prismic from "@prismicio/client";

type PrismicClientError =
	| prismic.PrismicError
	| prismic.ParsingError
	| prismic.ForbiddenError;

type StateMachineStateType = "idle" | "pending" | "succeeded" | "failed";

export type StateMachineState<TData> = {
	state: StateMachineStateType;
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
		return { state: "pending" };
	} else if (action[0] === "succeed") {
		return { state: "succeeded", data: action[1] };
	} else if (action[0] === "fail") {
		return { state: "failed", data: state.data, error: action[1] };
	}

	return state;
};

const initialState = { state: "idle" } as const;

type UsePrismicClientStateMachineResult<TData> = [
	state: StateMachineState<TData>,
	actions: {
		start(): void;
		succeed(data: TData): void;
		fail(error: PrismicClientError): void;
	},
];

export const usePrismicClientStateMachine = <
	TData,
>(): UsePrismicClientStateMachineResult<TData> => {
	const [state, dispatch] = React.useReducer<
		React.Reducer<StateMachineState<TData>, StateMachineAction<TData>>
	>(reducer, initialState);

	const start = React.useCallback(() => dispatch(["start"]), []);

	const succeed = React.useCallback(
		(data: TData) => dispatch(["succeed", data]),
		[],
	);

	const fail = React.useCallback(
		(error: PrismicClientError) => dispatch(["fail", error]),
		[],
	);

	return React.useMemo(
		() => [state, { start, succeed, fail }],
		[state, start, succeed, fail],
	);
};
