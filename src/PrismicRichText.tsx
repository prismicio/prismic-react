import {
	RichTextMapSerializer,
	RichTextFunctionSerializer,
	Element,
	composeSerializers,
	wrapMapSerializer,
	serialize,
} from "@prismicio/richtext";
// const escapeHtml = require("escape-html");

import * as React from "react";
import { LinkResolverFunction } from "@prismicio/helpers";
import * as prismicH from "@prismicio/helpers";
import * as prismicT from "@prismicio/types";
import { usePrismicContext } from "./PrismicProvider";
import { ComponentFunctionSerializer, ComponentMapSerializer } from "./types";
import { PrismicLink, PrismicLinkProps } from "./PrismicLink";

// const { Elements } = PrismicRichText;

export type PrismicRichTextProps = {
	field: prismicT.RichTextField;
	linkResolver?: PrismicLinkProps["linkResolver"];
	/** @deprecated Use the `components` prop instead. */
	htmlSerializer?: RichTextFunctionSerializer<React.ComponentType>;
	/**
	 * TODO: Describe that we recommend the object syntax over function, but we
	 * still support both.
	 */
	components?:
		| RichTextMapSerializer<JSX.Element>
		| RichTextFunctionSerializer<JSX.Element>;
	internalLinkComponent?: PrismicLinkProps["internalComponent"];
	externalLinkComponent?: PrismicLinkProps["externalComponent"];
};

function defaultComponentSerializer(
	linkResolver: LinkResolverFunction<string> | undefined,
	internalLinkComponent: PrismicRichTextProps["internalLinkComponent"],
	externalLinkComponent: PrismicRichTextProps["externalLinkComponent"],
	_type: Parameters<ComponentFunctionSerializer>[0],
	node: Parameters<ComponentFunctionSerializer>[1],
	content: Parameters<ComponentFunctionSerializer>[2],
	children: Parameters<ComponentFunctionSerializer>[3],
	_key: Parameters<ComponentFunctionSerializer>[4],
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
			// TODO: Make sure label wasn't needed here
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
		// return serializeImage(linkResolver, node);
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
			// TODO: Handle \n with <br />
			return <span>{children}</span>;
	}
}

export const PrismicRichText = (props: PrismicRichTextProps): JSX.Element => {
	const context = usePrismicContext();

	const linkResolver = props.linkResolver || context.linkResolver;

	// TODO: Memoize w/ useMemo
	const serializer = composeSerializers(
		typeof props.components === "object"
			? wrapMapSerializer(props.components)
			: props.components,
		defaultComponentSerializer.bind(
			null,
			linkResolver,
			props.internalLinkComponent,
			props.externalLinkComponent,
		),
	);

	// TODO: Memoize w/ useMemo
	const val = serialize(props.field, serializer);

	return <>{val}</>;
};
