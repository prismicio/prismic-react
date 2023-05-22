import * as React from "react";
import * as prismic from "@prismicio/client";
import * as prismicR from "@prismicio/richtext";

import { JSXFunctionSerializer, JSXMapSerializer } from "../types";
import { LinkProps, PrismicLink } from "./PrismicLink";
import { devMsg } from "../lib/devMsg";

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
	components?: JSXMapSerializer | JSXFunctionSerializer;

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

type CreateDefaultSerializerArgs<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	LinkResolverFunction extends prismic.LinkResolverFunction<any> = prismic.LinkResolverFunction,
> = {
	linkResolver: LinkResolverFunction | undefined;
	internalLinkComponent?: React.ComponentType<LinkProps>;
	externalLinkComponent?: React.ComponentType<LinkProps>;
};

const createDefaultSerializer = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	LinkResolverFunction extends prismic.LinkResolverFunction<any>,
>(
	args: CreateDefaultSerializerArgs<LinkResolverFunction>,
): JSXFunctionSerializer =>
	prismicR.wrapMapSerializer({
		heading1: ({ children, key }) => <h1 key={key}>{children}</h1>,
		heading2: ({ children, key }) => <h2 key={key}>{children}</h2>,
		heading3: ({ children, key }) => <h3 key={key}>{children}</h3>,
		heading4: ({ children, key }) => <h4 key={key}>{children}</h4>,
		heading5: ({ children, key }) => <h5 key={key}>{children}</h5>,
		heading6: ({ children, key }) => <h6 key={key}>{children}</h6>,
		paragraph: ({ children, key }) => <p key={key}>{children}</p>,
		preformatted: ({ node, key }) => <pre key={key}>{node.text}</pre>,
		strong: ({ children, key }) => <strong key={key}>{children}</strong>,
		em: ({ children, key }) => <em key={key}>{children}</em>,
		listItem: ({ children, key }) => <li key={key}>{children}</li>,
		oListItem: ({ children, key }) => <li key={key}>{children}</li>,
		list: ({ children, key }) => <ul key={key}>{children}</ul>,
		oList: ({ children, key }) => <ol key={key}>{children}</ol>,
		image: ({ node, key }) => {
			const img = (
				<img
					src={node.url}
					alt={node.alt ?? undefined}
					data-copyright={node.copyright ? node.copyright : undefined}
				/>
			);

			return (
				<p key={key} className="block-img">
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
		embed: ({ node, key }) => (
			<div
				key={key}
				data-oembed={node.oembed.embed_url}
				data-oembed-type={node.oembed.type}
				data-oembed-provider={node.oembed.provider_name}
				dangerouslySetInnerHTML={{ __html: node.oembed.html ?? "" }}
			/>
		),
		hyperlink: ({ node, children, key }) => (
			<PrismicLink
				key={key}
				field={node.data}
				linkResolver={args.linkResolver}
				internalComponent={args.internalLinkComponent}
				externalComponent={args.externalLinkComponent}
			>
				{children}
			</PrismicLink>
		),
		label: ({ node, children, key }) => (
			<span key={key} className={node.data.label}>
				{children}
			</span>
		),
		span: ({ text, key }) => {
			const result: React.ReactNode[] = [];

			let i = 0;
			for (const line of text.split("\n")) {
				if (i > 0) {
					result.push(<br key={`${i}__break`} />);
				}

				result.push(<React.Fragment key={`${i}__line`}>{line}</React.Fragment>);

				i++;
			}

			return <React.Fragment key={key}>{result}</React.Fragment>;
		},
	});

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
	return React.useMemo(() => {
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

		if (prismic.isFilled.richText(field)) {
			const serializer = prismicR.composeSerializers(
				typeof components === "object"
					? prismicR.wrapMapSerializer(components)
					: components,
				createDefaultSerializer({
					linkResolver,
					internalLinkComponent,
					externalLinkComponent,
				}),
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
