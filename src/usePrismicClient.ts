import * as prismic from "@prismicio/client";

import { invariant } from "./lib/invariant";

import { usePrismicContext } from "./PrismicProvider";

export const usePrismicClient = (
	explicitClient?: prismic.Client,
): prismic.Client => {
	const context = usePrismicContext();

	const client = explicitClient || context?.client;
	invariant(
		client,
		"A @prismicio/client is required to query documents. Provide a client to the hook or to a <PrismicProvider> higher in your component tree.",
	);

	return client;
};
