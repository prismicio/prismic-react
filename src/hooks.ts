import * as prismic from "@prismicio/client";
import * as prismicT from "@prismicio/types";

import {
	ClientHookReturnType,
	ClientMethodParameters,
	HookOnlyParameters,
	useStatefulPrismicClientMethod,
} from "./useStatefulPrismicClientMethod";

const proto = prismic.Client.prototype;

export const usePrismicDocuments = <TDocument extends prismicT.PrismicDocument>(
	...args: [params?: ClientMethodParameters<"get">[0] & HookOnlyParameters]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.get, args);

export const useFirstPrismicDocument = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [params?: ClientMethodParameters<"getFirst">[0] & HookOnlyParameters]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod(proto.getFirst, args);

export const useAllPrismicDocuments = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [params?: ClientMethodParameters<"getAll">[0] & HookOnlyParameters]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAll, args);

export const usePrismicDocumentByID = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getByID">[0],
		params?: ClientMethodParameters<"getByID">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod(proto.getByID, args);

export const usePrismicDocumentsByIDs = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getByIDs">[0],
		params?: ClientMethodParameters<"getByIDs">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.getByIDs, args);

export const useAllPrismicDocumentsByIDs = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getAllByIDs">[0],
		params?: ClientMethodParameters<"getAllByIDs">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAllByIDs, args);

export const usePrismicDocumentByUID = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getByUID">[0],
		uid: ClientMethodParameters<"getByUID">[1],
		params?: ClientMethodParameters<"getByUID">[2] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod(proto.getByUID, args);

export const useSinglePrismicDocument = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getSingle">[0],
		params?: ClientMethodParameters<"getSingle">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod(proto.getSingle, args);

export const usePrismicDocumentsByType = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getByType">[0],
		params?: ClientMethodParameters<"getByType">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.getByType, args);

export const useAllPrismicDocumentsByType = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getAllByType">[0],
		params?: ClientMethodParameters<"getAllByType">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAllByType, args);

export const usePrismicDocumentsByTag = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getByTag">[0],
		params?: ClientMethodParameters<"getByTag">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.getByTag, args);

export const useAllPrismicDocumentsByTag = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getAllByTag">[0],
		params?: ClientMethodParameters<"getAllByTag">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAllByTag, args);

export const usePrismicDocumentsByTags = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getByTags">[0],
		params?: ClientMethodParameters<"getByTags">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.getByTags, args);

export const useAllPrismicDocumentsByTags = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getAllByTags">[0],
		params?: ClientMethodParameters<"getAllByTags">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAllByTags, args);
