import * as prismic from "@prismicio/client";
import * as prismicT from "@prismicio/types";

import {
	ClientHookReturnType,
	ClientMethodParameters,
	HookOnlyParameters,
	useStatefulPrismicClientMethod,
} from "./useStatefulPrismicClientMethod";

const proto = prismic.Client.prototype;

/**
 * A hook that queries content from the Prismic repository.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.get}
 */
export const usePrismicDocuments = <TDocument extends prismicT.PrismicDocument>(
	...args: [params?: ClientMethodParameters<"get">[0] & HookOnlyParameters]
): ClientHookReturnType<prismicT.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.get, args);

/**
 * A hook that queries content from the Prismic repository and returns only the
 * first result, if any.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getFirst}
 */
export const useFirstPrismicDocument = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [params?: ClientMethodParameters<"getFirst">[0] & HookOnlyParameters]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod(proto.getFirst, args);

/**
 * A hook that queries content from the Prismic repository and returns all
 * matching content. If no predicates are provided, all documents will be fetched.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getAll}
 */
export const useAllPrismicDocuments = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [params?: ClientMethodParameters<"getAll">[0] & HookOnlyParameters]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAll, args);

/**
 * A hook that queries a document from the Prismic repository with a specific ID.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 * @param id - ID of the document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getByID}
 */
export const usePrismicDocumentByID = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getByID">[0],
		params?: ClientMethodParameters<"getByID">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod(proto.getByID, args);

/**
 * A hook that queries documents from the Prismic repository with specific IDs.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param ids - A list of document IDs
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getByIDs}
 */
export const usePrismicDocumentsByIDs = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getByIDs">[0],
		params?: ClientMethodParameters<"getByIDs">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismicT.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.getByIDs, args);

/**
 * A hook that queries all documents from the Prismic repository with specific IDs.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param ids - A list of document IDs
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getAllByIDs}
 */
export const useAllPrismicDocumentsByIDs = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getAllByIDs">[0],
		params?: ClientMethodParameters<"getAllByIDs">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAllByIDs, args);

/**
 * A hook that queries a document from the Prismic repository with a specific
 * UID and Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 * @param documentType - The API ID of the document's Custom Type
 * @param uid - UID of the document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getByUID}
 */
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

/**
 * A hook that queries a singleton document from the Prismic repository for a
 * specific Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 * @param documentType - The API ID of the singleton Custom Type
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getSingle}
 */
export const useSinglePrismicDocument = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getSingle">[0],
		params?: ClientMethodParameters<"getSingle">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod(proto.getSingle, args);

/**
 * A hook that queries documents from the Prismic repository for a specific Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param documentType - The API ID of the Custom Type
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getByType}
 */
export const usePrismicDocumentsByType = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getByType">[0],
		params?: ClientMethodParameters<"getByType">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismicT.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.getByType, args);

/**
 * A hook that queries all documents from the Prismic repository for a specific
 * Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param documentType - The API ID of the Custom Type
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getAllByType}
 */
export const useAllPrismicDocumentsByType = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getAllByType">[0],
		params?: ClientMethodParameters<"getAllByType">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAllByType, args);

/**
 * A hook that queries documents from the Prismic repository with a specific tag.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param tag - The tag that must be included on a document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getByTag}
 */
export const usePrismicDocumentsByTag = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getByTag">[0],
		params?: ClientMethodParameters<"getByTag">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismicT.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.getByTag, args);

/**
 * A hook that queries all documents from the Prismic repository with a specific tag.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param tag - The tag that must be included on a document
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getAllByTag}
 */
export const useAllPrismicDocumentsByTag = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getAllByTag">[0],
		params?: ClientMethodParameters<"getAllByTag">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAllByTag, args);

/**
 * A hook that queries documents from the Prismic repository with specific tags.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param tags - A list of tags that must be included on a document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getByTags}
 */
export const usePrismicDocumentsByTags = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getByTags">[0],
		params?: ClientMethodParameters<"getByTags">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismicT.Query<TDocument>> =>
	useStatefulPrismicClientMethod(proto.getByTags, args);

/**
 * A hook that queries all documents from the Prismic repository with specific tags.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 * @param tags - A list of tags that must be included on a document
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 * @see Underlying `@prismicio/client` method {@link proto.getAllByTags}
 */
export const useAllPrismicDocumentsByTags = <
	TDocument extends prismicT.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getAllByTags">[0],
		params?: ClientMethodParameters<"getAllByTags">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod(proto.getAllByTags, args);
