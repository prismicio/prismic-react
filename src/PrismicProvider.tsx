import type * as prismic from "@prismicio/client";

import * as React from "react";
import * as prismicH from "@prismicio/helpers";

import { LinkProps } from "./PrismicLink";
import { JSXFunctionSerializer, JSXMapSerializer } from "./types";

/**
 * React context value containing shared configuration for `@prismicio/react`
 * components and hooks.
 */
export type PrismicContextValue = {
	/**
	 * A `@prismicio/client` instance used to fetch content from a Prismic
	 * repository. This is used by `@prismicio/react` hooks, such as
	 * `usePrismicDocuments()`.
	 */
	client?: prismic.Client;

	/**
	 * A Link Resolver used to resolve links for `<PrismicLink>` and `<PrismicRichText>`.
	 *
	 * @remarks
	 * If your app uses Route Resolvers when querying for your Prismic
	 * repository's content, a Link Resolver does not need to be provided.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	linkResolver?: prismicH.LinkResolverFunction;

	/**
	 * A map or function that maps a Rich Text block to a React component.
	 *
	 * @remarks
	 * Prefer using a map serializer over the function serializer when possible.
	 * The map serializer is simpler to maintain.
	 * @example A map serializer.
	 *
	 * ```jsx
	 * {
	 *   heading1: ({children}) => <Heading>{children}</Heading>
	 * }
	 * ```
	 *
	 * @example A function serializer.
	 *
	 * ```jsx
	 * (type, node, content, children) => {
	 * 	switch (type) {
	 * 		case "heading1": {
	 * 			return <Heading>{chidlren}</Heading>;
	 * 		}
	 * 	}
	 * };
	 * ```
	 */
	richTextComponents?: JSXMapSerializer | JSXFunctionSerializer;

	/**
	 * The component rendered by `<PrismicLink>` for internal URLs. Defaults to `<a>`.
	 */
	internalLinkComponent?: React.ElementType<LinkProps>;

	/**
	 * The component rendered by `<PrismicLink>` for external URLs. Defaults to `<a>`.
	 */
	externalLinkComponent?: React.ElementType<LinkProps>;

	/**
	 * Children for the component.
	 */
	children?: React.ReactNode;
};

/**
 * React context containing shared configuration for `@prismicio/react`
 * components and hooks.
 */
export const PrismicContext = React.createContext<PrismicContextValue>({});

/**
 * Props for `<PrismicProvider>`.
 */
export type PrismicProviderProps = PrismicContextValue;

/**
 * React context provider to share configuration for `@prismicio/react`
 * components and hooks.
 *
 * @returns A React context provider with shared configuration.
 */
export const PrismicProvider = ({
	client,
	linkResolver,
	richTextComponents,
	internalLinkComponent,
	externalLinkComponent,
	children,
}: PrismicProviderProps): JSX.Element => {
	const value = React.useMemo<PrismicContextValue>(
		() => ({
			client,
			linkResolver,
			richTextComponents,
			internalLinkComponent,
			externalLinkComponent,
		}),
		[
			client,
			linkResolver,
			richTextComponents,
			internalLinkComponent,
			externalLinkComponent,
		],
	);

	return (
		<PrismicContext.Provider value={value}>{children}</PrismicContext.Provider>
	);
};
