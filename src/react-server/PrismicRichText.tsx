import * as React from "react";
import * as prismic from "@prismicio/client";
import * as prismicR from "@prismicio/richtext";

import { createDefaultSerializer } from "../lib/createDefaultSerializer";
import { devMsg } from "../lib/devMsg";
import { wrapShorthandSerializer } from "../lib/wrapShorthandSerializer";

import {
	JSXFunctionSerializer,
	JSXMapSerializerWithShorthands,
} from "../types";

import { LinkProps } from "./PrismicLink";

/**
 * Props for `<PrismicRichText>`.
 */
export type PrismicRichTextProps<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	LinkResolverFunction extends prismic.LinkResolverFunction<any> = prismic.LinkResolverFunction,
> = {
	/**
	 * The Prismic Rich Text field to render.
	 */
	field: prismic.RichTextField | null | undefined;

	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks
	 * If your app uses Route Resolvers when querying for your Prismic
	 * repository's content, a Link Resolver does not need to be provided.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	linkResolver?: LinkResolverFunction;

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
	 * 			return <Heading>{children}</Heading>;
	 * 		}
	 * 	}
	 * };
	 * ```
	 */
	components?: JSXMapSerializerWithShorthands | JSXFunctionSerializer;

	/**
	 * The React component rendered for links when the URL is internal.
	 *
	 * @defaultValue `<a>`
	 */
	internalLinkComponent?: React.ComponentType<LinkProps>;

	/**
	 * The React component rendered for links when the URL is external.
	 *
	 * @defaultValue `<a>`
	 */
	externalLinkComponent?: React.ComponentType<LinkProps>;

	/**
	 * The value to be rendered when the field is empty. If a fallback is not
	 * given, `null` will be rendered.
	 */
	fallback?: React.ReactNode;
};

/**
 * React component that renders content from a Prismic Rich Text field. By
 * default, HTML elements are rendered for each piece of content. A `heading1`
 * block will render an `<h1>` HTML element, for example. Links will use
 * `<PrismicLink>` by default which can be customized using the
 * `internalLinkComponent` and `externalLinkComponent` props.
 *
 * To customize the components that are rendered, provide a map or function
 * serializer to the `components` prop.
 *
 * @remarks
 * This component returns a React fragment with no wrapping element around the
 * content. If you need a wrapper, add a component around `<PrismicRichText>`.
 * @example Rendering a Rich Text field using the default HTMl elements.
 *
 * ```jsx
 * <PrismicRichText field={document.data.content} />;
 * ```
 *
 * @example Rendering a Rich Text field using a custom set of React components.
 *
 * ```jsx
 * <PrismicRichText
 * 	field={document.data.content}
 * 	components={{
 * 		heading1: ({ children }) => <Heading>{children}</Heading>,
 * 	}}
 * />;
 * ```
 *
 * @example Rendering a Rich Text field using a custom class name.
 *
 * ```jsx
 * <PrismicRichText
 * 	field={document.data.content}
 * 	components={{
 * 		heading1: "text-4xl",
 * 	}}
 * />;
 * ```
 *
 * @param props - Props for the component.
 *
 * @returns The Rich Text field's content as React components.
 *
 * @see Learn about Rich Text fields {@link https://prismic.io/docs/core-concepts/rich-text-title}
 * @see Learn about Rich Text serializers {@link https://prismic.io/docs/core-concepts/html-serializer}
 */
export function PrismicRichText<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	LinkResolverFunction extends prismic.LinkResolverFunction<any>,
>({
	linkResolver,
	field,
	fallback,
	components,
	externalLinkComponent,
	internalLinkComponent,
	...restProps
}: PrismicRichTextProps<LinkResolverFunction>): JSX.Element | null {
	if (
		typeof process !== "undefined" &&
		process.env.NODE_ENV === "development"
	) {
		if ("className" in restProps) {
			console.warn(
				`[PrismicRichText] className cannot be passed to <PrismicRichText> since it renders an array without a wrapping component. For more details, see ${devMsg(
					"classname-is-not-a-valid-prop",
				)}.`,
				field,
			);
		}
	}

	return React.useMemo(() => {
		if (prismic.isFilled.richText(field)) {
			const serializer = prismicR.composeSerializers(
				components
					? wrapShorthandSerializer({
							serializer: components,
							linkResolver,
							internalLinkComponent,
							externalLinkComponent,
					  })
					: undefined,
				prismicR.wrapMapSerializer(
					createDefaultSerializer({
						linkResolver,
						internalLinkComponent,
						externalLinkComponent,
					}),
				),
			);

			// The serializer is wrapped in a higher-order function
			// that automatically applies a key to React Elements
			// if one is not already given.
			const serialized = prismicR.serialize<JSX.Element>(
				field,
				(type, node, text, children, key) => {
					const result = serializer(type, node, text, children, key);

					if (React.isValidElement(result) && result.key == null) {
						return React.cloneElement(result, { key });
					} else {
						return result;
					}
				},
			);

			return <>{serialized}</>;
		} else {
			return fallback != null ? <>{fallback}</> : null;
		}
	}, [
		field,
		internalLinkComponent,
		externalLinkComponent,
		components,
		linkResolver,
		fallback,
	]);
}
