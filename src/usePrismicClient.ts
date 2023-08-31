import type * as prismic from "@prismicio/client";

import { usePrismicContext } from "./usePrismicContext";

/**
 * Retrieve the `@prismicio/client` instance provided to `<PrismicProvider>`
 * higher in the React tree.
 *
 * @param explicitClient - An optional `@prismicio/client` instance to override
 *   the Client provided to `<PrismicProvider>`.
 *
 * @returns The `@prismicio/client` instance provided to `<PrismicProvider>`.
 */
export const usePrismicClient = <
	TDocuments extends prismic.PrismicDocument = prismic.PrismicDocument,
>(
	explicitClient?: prismic.Client<TDocuments>,
): prismic.Client<TDocuments> => {
	const context = usePrismicContext();

	const client = explicitClient || context?.client;

	if (!client) {
		throw new Error(
			"A @prismicio/client is required to query documents. Provide a client to the hook or to a <PrismicProvider> higher in your component tree.",
		);
	}

	return client;
};
