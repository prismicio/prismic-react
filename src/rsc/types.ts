import { LinkResolverFunction } from "@prismicio/helpers";

import { JSXFunctionSerializer, JSXMapSerializer } from "../types";

import { LinkProps } from "./PrismicLink";

export interface PrismicConfig {
	/**
	 * A Link Resolver used to resolve links for `<PrismicLink>` and
	 * `<PrismicRichText>`.
	 *
	 * @remarks
	 * If your app uses Route Resolvers when querying for your Prismic
	 * repository's content, a Link Resolver does not need to be provided.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	linkResolver?: LinkResolverFunction<string | undefined | void>;

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
	 * The component rendered by `<PrismicLink>` for internal URLs. Defaults to
	 * `<a>`.
	 */
	internalLinkComponent?: React.ElementType<LinkProps>;

	/**
	 * The component rendered by `<PrismicLink>` for external URLs. Defaults to
	 * `<a>`.
	 */
	externalLinkComponent?: React.ElementType<LinkProps>;
}
