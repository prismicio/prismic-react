import type * as prismic from "@prismicio/client";

import {
	ClientHookReturnType,
	ClientMethodParameters,
	HookOnlyParameters,
	useStatefulPrismicClientMethod,
} from "./useStatefulPrismicClientMethod";

/**
 * A hook that queries content from the Prismic repository.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.get}
 */
export const usePrismicDocuments = <TDocument extends prismic.PrismicDocument>(
	...args: [params?: ClientMethodParameters<"get">[0] & HookOnlyParameters]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod("get", args);

/**
 * A hook that queries content from the Prismic repository and returns only the
 * first result, if any.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 *
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getFirst}
 */
export const useFirstPrismicDocument = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [params?: ClientMethodParameters<"getFirst">[0] & HookOnlyParameters]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod("getFirst", args);

/**
 * A hook that queries content from the Prismic repository and returns all
 * matching content. If no predicates are provided, all documents will be
 * fetched.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getAll}
 */
export const useAllPrismicDocumentsDangerously = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		params?: ClientMethodParameters<"dangerouslyGetAll">[0] &
			HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod("dangerouslyGetAll", args);

/**
 * A hook that queries a document from the Prismic repository with a specific
 * ID.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 *
 * @param id - ID of the document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByID}
 */
export const usePrismicDocumentByID = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getByID">[0],
		params?: ClientMethodParameters<"getByID">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod("getByID", args);

/**
 * A hook that queries documents from the Prismic repository with specific IDs.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param ids - A list of document IDs
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByIDs}
 */
export const usePrismicDocumentsByIDs = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getByIDs">[0],
		params?: ClientMethodParameters<"getByIDs">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod("getByIDs", args);

/**
 * A hook that queries all documents from the Prismic repository with specific
 * IDs.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param ids - A list of document IDs
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getAllByIDs}
 */
export const useAllPrismicDocumentsByIDs = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		id: ClientMethodParameters<"getAllByIDs">[0],
		params?: ClientMethodParameters<"getAllByIDs">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod("getAllByIDs", args);

/**
 * A hook that queries a document from the Prismic repository with a specific
 * UID and Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 *
 * @param documentType - The API ID of the document's Custom Type
 * @param uid - UID of the document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByUID}
 */
export const usePrismicDocumentByUID = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getByUID">[0],
		uid: ClientMethodParameters<"getByUID">[1],
		params?: ClientMethodParameters<"getByUID">[2] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod("getByUID", args);

/**
 * A hook that queries documents from the Prismic repository with specific UIDs
 * of a Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 *
 * @param documentType - The API ID of the document's Custom Type
 * @param uids - A list of document UIDs.
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByUID}
 */
export const usePrismicDocumentsByUIDs = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getByUIDs">[0],
		uids: ClientMethodParameters<"getByUIDs">[1],
		params?: ClientMethodParameters<"getByUIDs">[2] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod("getByUIDs", args);

/**
 * A hook that queries all documents from the Prismic repository with specific
 * UIDs of a Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 *
 * @param documentType - The API ID of the document's Custom Type
 * @param uids - A list of document UIDs.
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByUID}
 */
export const useAllPrismicDocumentsByUIDs = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getByUIDs">[0],
		uids: ClientMethodParameters<"getByUIDs">[1],
		params?: ClientMethodParameters<"getByUIDs">[2] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod("getAllByUIDs", args);

/**
 * A hook that queries a singleton document from the Prismic repository for a
 * specific Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of the Prismic document returned
 *
 * @param documentType - The API ID of the singleton Custom Type
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getSingle}
 */
export const useSinglePrismicDocument = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getSingle">[0],
		params?: ClientMethodParameters<"getSingle">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument> =>
	useStatefulPrismicClientMethod("getSingle", args);

/**
 * A hook that queries documents from the Prismic repository for a specific
 * Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param documentType - The API ID of the Custom Type
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByType}
 */
export const usePrismicDocumentsByType = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getByType">[0],
		params?: ClientMethodParameters<"getByType">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod("getByType", args);

/**
 * A hook that queries all documents from the Prismic repository for a specific
 * Custom Type.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param documentType - The API ID of the Custom Type
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getAllByType}
 */
export const useAllPrismicDocumentsByType = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		documentType: ClientMethodParameters<"getAllByType">[0],
		params?: ClientMethodParameters<"getAllByType">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod("getAllByType", args);

/**
 * A hook that queries documents from the Prismic repository with a specific
 * tag.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param tag - The tag that must be included on a document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByTag}
 */
export const usePrismicDocumentsByTag = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getByTag">[0],
		params?: ClientMethodParameters<"getByTag">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod("getByTag", args);

/**
 * A hook that queries all documents from the Prismic repository with a specific
 * tag.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param tag - The tag that must be included on a document
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getAllByTag}
 */
export const useAllPrismicDocumentsByTag = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getAllByTag">[0],
		params?: ClientMethodParameters<"getAllByTag">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod("getAllByTag", args);

/**
 * A hook that queries documents from the Prismic repository with specific tags.
 * A document must be tagged with at least one of the queried tags to be
 * included.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param tags - A list of tags that must be included on a document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByTags}
 */
export const usePrismicDocumentsBySomeTags = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getBySomeTags">[0],
		params?: ClientMethodParameters<"getBySomeTags">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod("getBySomeTags", args);

/**
 * A hook that queries all documents from the Prismic repository with specific
 * tags. A document must be tagged with at least one of the queried tags to be
 * included.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param tags - A list of tags that must be included on a document
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getAllByTags}
 */
export const useAllPrismicDocumentsBySomeTags = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getAllBySomeTags">[0],
		params?: ClientMethodParameters<"getAllBySomeTags">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod("getAllBySomeTags", args);

/**
 * A hook that queries documents from the Prismic repository with specific tags.
 * A document must be tagged with all of the queried tags to be included.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param tags - A list of tags that must be included on a document
 * @param params - Parameters to filter, sort, and paginate results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getByTags}
 */
export const usePrismicDocumentsByEveryTag = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getByEveryTag">[0],
		params?: ClientMethodParameters<"getByEveryTag">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<prismic.Query<TDocument>> =>
	useStatefulPrismicClientMethod("getByEveryTag", args);

/**
 * A hook that queries all documents from the Prismic repository with specific
 * tags. A document must be tagged with all of the queried tags to be included.
 *
 * @remarks
 * An additional `@prismicio/client` instance can be provided at
 * `params.client`.
 * @typeParam TDocument - Type of Prismic documents returned
 *
 * @param tags - A list of tags that must be included on a document
 * @param params - Parameters to filter and sort results
 *
 * @returns The composable payload {@link ClientHookReturnType}
 *
 * @see Underlying `@prismicio/client` method {@link proto.getAllByTags}
 */
export const useAllPrismicDocumentsByEveryTag = <
	TDocument extends prismic.PrismicDocument,
>(
	...args: [
		tag: ClientMethodParameters<"getAllByEveryTag">[0],
		params?: ClientMethodParameters<"getAllByEveryTag">[1] & HookOnlyParameters,
	]
): ClientHookReturnType<TDocument[]> =>
	useStatefulPrismicClientMethod("getAllByEveryTag", args);
