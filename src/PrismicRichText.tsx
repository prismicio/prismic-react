/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import * as React from "react";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import * as prismicR from "@prismicio/richtext";

import { JSXFunctionSerializer, JSXMapSerializer } from "./types";
import { PrismicLink, PrismicLinkProps } from "./PrismicLink";
import { usePrismicContext } from "./usePrismicContext";

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
	htmlSerializer?: JSXFunctionSerializer;

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
	components?: JSXMapSerializer | JSXFunctionSerializer;

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

type CreateDefaultSerializerArgs = {
	linkResolver: prismicH.LinkResolverFunction<string> | undefined;
	internalLinkComponent: PrismicRichTextProps["internalLinkComponent"];
	externalLinkComponent: PrismicRichTextProps["externalLinkComponent"];
};

const createDefaultSerializer = (
	args: CreateDefaultSerializerArgs,
): JSXFunctionSerializer =>
	prismicR.wrapMapSerializer({
		heading1: ({ children }) => <h1>{children}</h1>,
		heading2: ({ children }) => <h2>{children}</h2>,
		heading3: ({ children }) => <h3>{children}</h3>,
		heading4: ({ children }) => <h4>{children}</h4>,
		heading5: ({ children }) => <h5>{children}</h5>,
		heading6: ({ children }) => <h6>{children}</h6>,
		paragraph: ({ children }) => <p>{children}</p>,
		preformatted: ({ node }) => <pre>{node.text}</pre>,
		strong: ({ children }) => <strong>{children}</strong>,
		em: ({ children }) => <em>{children}</em>,
		listItem: ({ children }) => <li>{children}</li>,
		oListItem: ({ children }) => <li>{children}</li>,
		list: ({ children }) => <ul>{children}</ul>,
		oList: ({ children }) => <ol>{children}</ol>,
		image: ({ node }) => {
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
							linkResolver={args.linkResolver}
							internalComponent={args.internalLinkComponent}
							externalComponent={args.externalLinkComponent}
							field={node.linkTo}
						>
							{img}
						</PrismicLink>
					) : (
						img
					)}
				</p>
			);
		},
		embed: ({ node }) => (
			<div
				data-oembed={node.oembed.embed_url}
				data-oembed-type={node.oembed.type}
				data-oembed-provider={node.oembed.provider_name}
				dangerouslySetInnerHTML={{ __html: node.oembed.html }}
			/>
		),
		hyperlink: ({ node, children }) => (
			<PrismicLink
				field={node.data}
				linkResolver={args.linkResolver}
				internalComponent={args.internalLinkComponent}
				externalComponent={args.externalLinkComponent}
			>
				{children}
			</PrismicLink>
		),
		label: ({ node, children }) => (
			<span className={node.data.label}>{children}</span>
		),
		span: ({ text }) => <>{text}</>,
	});

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

	return React.useMemo(() => {
		const linkResolver = props.linkResolver || context.linkResolver;
		const components = props.components || context.richTextComponents;
		const defaultSerializer = createDefaultSerializer({
			linkResolver,
			internalLinkComponent: props.internalLinkComponent,
			externalLinkComponent: props.externalLinkComponent,
		});

		const serializer = components
			? prismicR.composeSerializers(
					typeof components === "object"
						? prismicR.wrapMapSerializer(components)
						: components,
					defaultSerializer,
			  )
			: defaultSerializer;

		const serialized = prismicR.serialize(props.field, serializer);

		return <>{serialized}</>;
	}, [
		props.field,
		props.internalLinkComponent,
		props.externalLinkComponent,
		props.components,
		props.linkResolver,
		context.linkResolver,
		context.richTextComponents,
	]);
};
