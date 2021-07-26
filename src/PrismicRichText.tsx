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
import { ComponentFunctionSerializer } from "./types";
import { PrismicLink, PrismicLinkProps } from "./PrismicLink";

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

/**
 *
 * @param linkResolver optinal link resolver for handling links
 * @param internalLinkComponent component to return for internal URLs
 * @param externalLinkComponent component to return for external URLs
 * @param _type string that determines which time of element to return
 * @param node RichTextNode
 * @param content raw content coming from prismic, returned as is by default if type isn't found
 * @param children content to be wrapped in elements
 */
function defaultComponentSerializer(
	linkResolver: prismicH.LinkResolverFunction<string> | undefined,
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
 * Serializes rich text to html and resolves links coming from rich text
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
