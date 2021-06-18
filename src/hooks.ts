import * as React from "react";
import * as prismic from "@prismicio/client";

import { usePrismicClient } from "./usePrismicClient";
import {
	StateMachineState,
	usePrismicClientStateMachine,
} from "./usePrismicClientStateMachine";

type ClientPrototype = typeof prismic.Client.prototype;

type ClientMethodParameters<MethodName extends keyof ClientPrototype> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ClientPrototype[MethodName] extends (...args: any[]) => any
		? Parameters<ClientPrototype[MethodName]>
		: never;

type HookOnlyParameters = {
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

const createClientHook = <
	TMethod extends (...args: any[]) => Promise<any>,
	TArgs extends Parameters<TMethod>,
>(
	method: TMethod,
) => {
	return (
		...args: TArgs
	): [
		data: StateMachineState<ReturnType<TMethod>>["data"],
		state: Pick<StateMachineState<ReturnType<TMethod>>, "state" | "error">,
	] => {
		const params:
			| (ClientMethodParameters<"get">[0] & HookOnlyParameters)
			| undefined = args[args.length - 1];
		const client = usePrismicClient(params?.client);
		const [state, actions] =
			usePrismicClientStateMachine<ReturnType<TMethod>>();

		React.useEffect(
			() => {
				actions.start();
				method
					.apply(client, args)
					.then((result) => actions.succeed(result))
					.catch((error) => actions.fail(error));
			},
			// We must disable exhaustive-deps to optimize providing `params` deps.
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[actions, client, ...args.slice(-1), ...getParamHookDependencies(params)],
		);

		return React.useMemo(
			() => [state.data, { state: state.state, error: state.error }],
			[state],
		);
	};
};

const proto = prismic.Client.prototype;

export const usePrismicDocuments = createClientHook<
	typeof proto.get,
	[params?: ClientMethodParameters<"get">[0] & HookOnlyParameters]
>(proto.get);

export const useFirstPrismicDocument = createClientHook<
	typeof proto.getFirst,
	[params?: ClientMethodParameters<"getFirst">[0] & HookOnlyParameters]
>(proto.getFirst);

export const useAllPrismicDocuments = createClientHook<
	typeof proto.getAll,
	[params?: ClientMethodParameters<"getAll">[0] & HookOnlyParameters]
>(proto.getAll);

export const usePrismicDocumentsByID = createClientHook<
	typeof proto.getByID,
	[
		id: ClientMethodParameters<"getByID">[0],
		params?: ClientMethodParameters<"getByID">[1] & HookOnlyParameters,
	]
>(proto.getByID);

export const usePrismicDocumentsByIDs = createClientHook<
	typeof proto.getByIDs,
	[
		ids: ClientMethodParameters<"getByIDs">[0],
		params?: ClientMethodParameters<"getByIDs">[1] & HookOnlyParameters,
	]
>(proto.getByIDs);

export const useAllPrismicDocumentsByIDs = createClientHook<
	typeof proto.getAllByIDs,
	[
		ids: ClientMethodParameters<"getAllByIDs">[0],
		params?: ClientMethodParameters<"getAllByIDs">[1] & HookOnlyParameters,
	]
>(proto.getAllByIDs);

export const usePrismicDocumentsByUID = createClientHook<
	typeof proto.getByUID,
	[
		documentType: ClientMethodParameters<"getByUID">[0],
		uid: ClientMethodParameters<"getByUID">[1],
		params?: ClientMethodParameters<"getByUID">[2] & HookOnlyParameters,
	]
>(proto.getByUID);

export const useSinglePrismicDocument = createClientHook<
	typeof proto.getSingle,
	[
		documentType: ClientMethodParameters<"getSingle">[0],
		params?: ClientMethodParameters<"getSingle">[1] & HookOnlyParameters,
	]
>(proto.getSingle);

export const usePrismicDocumentsByType = createClientHook<
	typeof proto.getByType,
	[
		documentType: ClientMethodParameters<"getByType">[0],
		params?: ClientMethodParameters<"getByType">[1] & HookOnlyParameters,
	]
>(proto.getByType);

export const useAllPrismicDocumentsByType = createClientHook<
	typeof proto.getAllByType,
	[
		documentType: ClientMethodParameters<"getAllByType">[0],
		params?: ClientMethodParameters<"getAllByType">[1] & HookOnlyParameters,
	]
>(proto.getAllByType);

export const usePrismicDocumentsByTag = createClientHook<
	typeof proto.getByTag,
	[
		tag: ClientMethodParameters<"getByTag">[0],
		params?: ClientMethodParameters<"getByTag">[1] & HookOnlyParameters,
	]
>(proto.getByTag);

export const useAllPrismicDocumentsByTag = createClientHook<
	typeof proto.getAllByTag,
	[
		tag: ClientMethodParameters<"getAllByTag">[0],
		params?: ClientMethodParameters<"getAllByTag">[1] & HookOnlyParameters,
	]
>(proto.getAllByTag);

export const usePrismicDocumentsByTags = createClientHook<
	typeof proto.getByTags,
	[
		tag: ClientMethodParameters<"getByTags">[0],
		params?: ClientMethodParameters<"getByTags">[1] & HookOnlyParameters,
	]
>(proto.getByTags);

export const useAllPrismicDocumentsByTags = createClientHook<
	typeof proto.getAllByTags,
	[
		tag: ClientMethodParameters<"getAllByTags">[0],
		params?: ClientMethodParameters<"getAllByTags">[1] & HookOnlyParameters,
	]
>(proto.getAllByTags);
