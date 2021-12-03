import type * as prismic from "@prismicio/client";

import * as React from "react";

import { usePrismicContext } from "./usePrismicContext";
import {
	ClientHookReturnType,
	useStatefulPrismicClientMethod,
} from "./useStatefulPrismicClientMethod";

export type UsePrismicPreviewResolverArgs = {
	/**
	 * An optional `@prismicio/client` instance to override the Client provided to
	 * `<PrismicProvider>`
	 */
	client?: prismic.Client;

	/**
	 * A function that maps a Prismic document to a URL within your app.
	 */
	linkResolver?: Parameters<
		prismic.Client["resolvePreviewURL"]
	>[0]["linkResolver"];

	/**
	 * A fallback URL if the Link Resolver does not return a value.
	 */
	defaultURL?: Parameters<prismic.Client["resolvePreviewURL"]>[0]["defaultURL"];

	/**
	 * The preview token (also known as a ref) that will be used to query preview
	 * content from the Prismic repository.
	 */
	previewToken?: Parameters<
		prismic.Client["resolvePreviewURL"]
	>[0]["previewToken"];

	/**
	 * The previewed document that will be used to determine the destination URL.
	 */
	documentID?: Parameters<prismic.Client["resolvePreviewURL"]>[0]["documentID"];

	/**
	 * A function to automatically navigate to the resolved URL. If a function is
	 * not provded, `usePreviewResolver` will not navigate to the URL.
	 *
	 * @param url - The resolved preview URL.
	 */
	navigate?: (url: string) => unknown;
};

/**
 * Resolve a preview session's URL. The resolved URL can be used to redirect to
 * the previewed document.
 *
 * If a `navigate` function is provided, the hook will automatically navigate to
 * the previewed document's URL.
 *
 * @param args - Arguments to configure how a URL is resolved.
 *
 * @returns A tuple containing the resolved URL and the hook's state.
 */
export const usePrismicPreviewResolver = (
	args: UsePrismicPreviewResolverArgs = {},
): ClientHookReturnType<string> => {
	const context = usePrismicContext();

	const linkResolver = args.linkResolver || context.linkResolver;

	const result = useStatefulPrismicClientMethod(
		"resolvePreviewURL",
		[
			{
				linkResolver,
				defaultURL: args.defaultURL || "/",
				previewToken: args.previewToken,
				documentID: args.documentID,
			},
		],
		args.client,
	);

	const [resolvedURL] = result;
	const { navigate } = args;

	React.useEffect(() => {
		if (resolvedURL && navigate) {
			navigate(resolvedURL);
		}
	}, [resolvedURL, navigate]);

	return result;
};
