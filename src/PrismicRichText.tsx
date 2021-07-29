import {
	RichTextMapSerializer,
	RichTextFunctionSerializer,
	Element,
	composeSerializers,
	wrapMapSerializer,
	serialize,
} from "@prismicio/richtext";

import * as React from "react";
import * as prismicH from "@prismicio/helpers";
import * as prismicT from "@prismicio/types";
import { usePrismicContext } from "./PrismicProvider";
import { JSXFunctionSerializer } from "./types";
import { PrismicLink, PrismicLinkProps } from "./PrismicLink";

/**
 * Props for `<PrismicRichText>`.
 */
export type PrismicRichTextProps = {
	/** The Prismic Rich Text field to render. */
	field: prismicT.RichTextField;
	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks If your app uses Route Resolvers when querying for your Prismic repository's content, a Link Resolver does not need to be provided.
	 *
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	linkResolver?: PrismicLinkProps["linkResolver"];
	/**
	 * A function that maps a Rich Text block to a React component.
	 *
	 * @see Learn about Rich Text serializers {@link https://prismic.io/docs/core-concepts/html-serializer}
	 *
	 * @deprecated Use the `components` prop instead. Prefer using a map serializer when possible.
	 * */
	htmlSerializer?: RichTextFunctionSerializer<React.ComponentType>;
	/**
	 * A map or function that maps a Rich Text block to a React component.
	 *
	 * @remarks Prefer using a map serializer over the function serializer when possible. The map serializer is simpler to maintain.
	 *
	 * @example
	 * A map serializer.
	 *
	 * ```ts
	 * {
	 *   heading1: ({children}) => <Heading>{children}</Heading>
	 * }
	 * ```
	 *
	 * @example
	 * A function serializer.
	 *
	 * ```ts
	 * (type, node, content, children) => {
	 *	 switch (type) {
	 *	   case 'heading1': {
	 *	     return <Heading>{chidlren}</Heading>
	 *	   }
	 *	 }
	 * }
	 * ```
	 */
	components?:
		| RichTextMapSerializer<JSX.Element>
		| RichTextFunctionSerializer<JSX.Element>;
	/**
	 * The React component rendered for links when the URL is internal.
	 *
	 * @default `<a>`
	 */
	internalLinkComponent?: PrismicLinkProps["internalComponent"];
	/**
	 * The React component rendered for links when the URL is external.
	 *
	 * @default `<a>`
	 */
	externalLinkComponent?: PrismicLinkProps["externalComponent"];
};

/**
 * fallback component serializer
 */
function defaultComponentSerializer(
	linkResolver: prismicH.LinkResolverFunction<string> | undefined,
	internalLinkComponent: PrismicRichTextProps["internalLinkComponent"],
	externalLinkComponent: PrismicRichTextProps["externalLinkComponent"],
	_type: Parameters<JSXFunctionSerializer>[0],
	node: Parameters<JSXFunctionSerializer>[1],
	content: Parameters<JSXFunctionSerializer>[2],
	children: Parameters<JSXFunctionSerializer>[3],
	_key: Parameters<JSXFunctionSerializer>[4],
): JSX.Element {
	switch (node.type) {
		case Element.heading1:
			return <h1>{children}</h1>;

		case Element.heading2:
			return <h2>{children}</h2>;

		case Element.heading3:
			return <h3>{children}</h3>;

		case Element.heading4:
			return <h4>{children}</h4>;

		case Element.heading5:
			return <h5>{children}</h5>;

		case Element.heading6:
			return <h6>{children}</h6>;

		case Element.paragraph:
			return <p>{children}</p>;

		case Element.preformatted:
			return <pre>{node.text}</pre>;

		case Element.strong:
			return <strong>{children}</strong>;

		case Element.em:
			return <em>{children}</em>;

		case Element.listItem:
		case Element.oListItem:
			return <li>{children}</li>;

		case Element.list:
			return <ul>{children}</ul>;

		case Element.oList:
			return <ol>{children}</ol>;

		case Element.image:
			const img = (
				<img
					src={node.url}
					alt={node.alt}
					data-copyright={node.copyright ? node.copyright : undefined}
				/>
			);

			return (
				<p className="block-img">
					{node.linkTo ? (
						<PrismicLink
							linkResolver={linkResolver}
							internalComponent={internalLinkComponent}
							externalComponent={externalLinkComponent}
							field={node.linkTo}
						>
							{img}
						</PrismicLink>
					) : (
						img
					)}
				</p>
			);

		case Element.embed:
			return (
				<div
					data-oembed={node.oembed.embed_url}
					data-oembed-type={node.oembed.type}
					data-oembed-provider={node.oembed.provider_name}
					dangerouslySetInnerHTML={{ __html: node.oembed.html }}
				/>
			);

		case Element.hyperlink:
			return (
				<PrismicLink
					field={node.data}
					linkResolver={linkResolver}
					internalComponent={internalLinkComponent}
					externalComponent={externalLinkComponent}
				>
					{children}
				</PrismicLink>
			);
		case Element.label:
			return <span className={node.data.label}>{children}</span>;
		case Element.span:
		default:
			return <>{content}</>;
	}
}

/**
 * React component that renders content from a Prismic Rich Text field. By default, HTML elements are rendered for each piece of content. A `heading1` block will render an `<h1>` HTML element, for example. Links will use `<PrismicLink>` by default which can be customized using the `internalLinkComponent` and `externalLinkComponent` props.
 *
 * To customize the components that are rendered, provide a map or function serializer to the `components` prop.
 *
 * Components can also be provided in a centralized location using the `<PrismicProvider>` React context provider.
 *
 * @remarks This component returns a React fragment with no wrapping element around the content. If you need a wrapper, add a component around `<PrismicRichText>`.
 *
 * @see Learn about Rich Text fields {@link https://prismic.io/docs/core-concepts/rich-text-title}
 * @see Learn about Rich Text serializers {@link https://prismic.io/docs/core-concepts/html-serializer}
 *
 * @example
 * Rendering a Rich Text field using the default HTMl elements.
 *
 * <PrismicRichText field={document.data.content} />
 *
 * @example
 * Rendering a Rich Text field using a custom set of React components.
 *
 * <PrismicRichText
 *   field={document.data.content}
 *   components={{
 *		 heading1: ({ children }) => <Heading>{children}</Heading>
 *   }}
 * />
 *
 * @param props Props for the component.
 *
 * @returns The Rich Text field's content as React components.
 */
export const PrismicRichText = (props: PrismicRichTextProps): JSX.Element => {
	const context = usePrismicContext();

	const val = React.useMemo(() => {
		const linkResolver = props.linkResolver || context.linkResolver;
		const components = props.components || context.richTextComponents;
		const serializer = components
			? composeSerializers(
					typeof components === "object"
						? wrapMapSerializer(components)
						: components,
					defaultComponentSerializer.bind(
						null,
						linkResolver,
						props.internalLinkComponent,
						props.externalLinkComponent,
					),
			  )
			: defaultComponentSerializer.bind(
					null,
					linkResolver,
					props.internalLinkComponent,
					props.externalLinkComponent,
			  );
		const val = serialize(props.field, serializer);

		return val;
	}, [
		props.field,
		props.internalLinkComponent,
		props.externalLinkComponent,
		props.components,
		props.linkResolver,
		context.linkResolver,
		context.richTextComponents,
	]);

	return <>{val}</>;
};
