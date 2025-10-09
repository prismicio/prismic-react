import {
	cloneElement,
	ComponentType,
	FC,
	Fragment,
	isValidElement,
	ReactNode,
} from "react";
import {
	isFilled,
	LinkResolverFunction,
	RichTextField,
	RTAnyNode,
} from "@prismicio/client";
import {
	composeSerializers,
	serialize,
	wrapMapSerializer,
	RichTextFunctionSerializer,
	RichTextMapSerializer,
} from "@prismicio/client/richtext";
import { DEV } from "esm-env";

import { devMsg } from "./lib/devMsg.js";

import { LinkProps, PrismicLink } from "./PrismicLink.js";

/**
 * A function mapping rich text block types to React Components. It is used to
 * render rich text fields.
 *
 * @see Templating rich text fields {@link https://prismic.io/docs/fields/rich-text}
 */
export type JSXFunctionSerializer = RichTextFunctionSerializer<ReactNode>;

/**
 * A map of rich text block types to React Components. It is used to render
 * rich text fields.
 *
 * @see Templating rich text fields {@link https://prismic.io/docs/fields/rich-text}
 */
export type JSXMapSerializer = RichTextMapSerializer<ReactNode>;

/** Props for `<PrismicRichText>`. */
export type PrismicRichTextProps = {
	/** The Prismic rich text field to render. */
	field: RichTextField | null | undefined;

	/**
	 * The link resolver used to resolve links.
	 *
	 * @remarks
	 * If your app uses route resolvers when querying for your Prismic
	 * repository's content, a link resolver does not need to be provided.
	 *
	 * @see Learn about link resolvers and route resolvers {@link https://prismic.io/docs/routes}
	 */
	linkResolver?: LinkResolverFunction;

	/**
	 * A map or function that maps a rich text block to a React component.
	 *
	 * @remarks
	 * Prefer using a map serializer over the function serializer when possible.
	 * The map serializer is simpler to maintain.
	 *
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
	internalLinkComponent?: ComponentType<LinkProps>;

	/**
	 * The React component rendered for links when the URL is external.
	 *
	 * @defaultValue `<a>`
	 */
	externalLinkComponent?: ComponentType<LinkProps>;

	/**
	 * The value to be rendered when the field is empty. If a fallback is not
	 * given, `null` will be rendered.
	 */
	fallback?: ReactNode;
};

type CreateDefaultSerializerArgs = {
	linkResolver: LinkResolverFunction | undefined;
	internalLinkComponent?: ComponentType<LinkProps>;
	externalLinkComponent?: ComponentType<LinkProps>;
};

const getDir = (node: RTAnyNode): "rtl" | undefined => {
	if ("direction" in node && node.direction === "rtl") {
		return "rtl";
	}
};

const createDefaultSerializer = (
	args: CreateDefaultSerializerArgs,
): JSXFunctionSerializer =>
	wrapMapSerializer<ReactNode>({
		heading1: ({ node, children, key }) => (
			<h1 key={key} dir={getDir(node)}>
				{children}
			</h1>
		),
		heading2: ({ node, children, key }) => (
			<h2 key={key} dir={getDir(node)}>
				{children}
			</h2>
		),
		heading3: ({ node, children, key }) => (
			<h3 key={key} dir={getDir(node)}>
				{children}
			</h3>
		),
		heading4: ({ node, children, key }) => (
			<h4 key={key} dir={getDir(node)}>
				{children}
			</h4>
		),
		heading5: ({ node, children, key }) => (
			<h5 key={key} dir={getDir(node)}>
				{children}
			</h5>
		),
		heading6: ({ node, children, key }) => (
			<h6 key={key} dir={getDir(node)}>
				{children}
			</h6>
		),
		paragraph: ({ node, children, key }) => (
			<p key={key} dir={getDir(node)}>
				{children}
			</p>
		),
		preformatted: ({ node, key }) => <pre key={key}>{node.text}</pre>,
		strong: ({ children, key }) => <strong key={key}>{children}</strong>,
		em: ({ children, key }) => <em key={key}>{children}</em>,
		listItem: ({ node, children, key }) => (
			<li key={key} dir={getDir(node)}>
				{children}
			</li>
		),
		oListItem: ({ node, children, key }) => (
			<li key={key} dir={getDir(node)}>
				{children}
			</li>
		),
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
			const result: ReactNode[] = [];

			let i = 0;
			for (const line of text.split("\n")) {
				if (i > 0) {
					result.push(<br key={`${i}__break`} />);
				}

				result.push(<Fragment key={`${i}__line`}>{line}</Fragment>);

				i++;
			}

			return <Fragment key={key}>{result}</Fragment>;
		},
	});

/**
 * Renders content from a Prismic rich text field as React components.
 *
 * @example
 *
 * ```tsx
 * <PrismicRichText field={slice.primary.text} />;
 * ```
 *
 * @see Learn how to style rich text, use custom components, and use labels for custom formatting: {@link https://prismic.io/docs/fields/rich-text}
 */
export const PrismicRichText: FC<PrismicRichTextProps> = (props) => {
	const {
		linkResolver,
		field,
		fallback,
		components,
		externalLinkComponent,
		internalLinkComponent,
		...restProps
	} = props;

	if (DEV) {
		if ("className" in restProps) {
			console.warn(
				`[PrismicRichText] className cannot be passed to <PrismicRichText> since it renders an array without a wrapping component. For more details, see ${devMsg(
					"classname-is-not-a-valid-prop",
				)}.`,
				field,
			);
		}
	}

	if (!isFilled.richText(field)) {
		return fallback != null ? <>{fallback}</> : null;
	}

	const serializer = composeSerializers<ReactNode>(
		typeof components === "object" ? wrapMapSerializer(components) : components,
		createDefaultSerializer({
			linkResolver,
			internalLinkComponent,
			externalLinkComponent,
		}),
	);

	// The serializer is wrapped in a higher-order function that
	// automatically applies a key to React Elements if one is not already
	// given.
	const serialized = serialize<ReactNode>(
		field,
		(type, node, text, children, key) => {
			const result = serializer(type, node, text, children, key);

			if (isValidElement(result) && result.key == null) {
				return cloneElement(result, { key });
			} else {
				return result;
			}
		},
	);

	if (!serialized) {
		return fallback != null ? <>{fallback}</> : null;
	}

	return <>{serialized}</>;
};
