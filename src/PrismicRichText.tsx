"use client";

import * as prismic from "@prismicio/client";
import * as prismicR from "@prismicio/richtext";

import {
	PrismicRichText as ServerPrismicRichText,
	PrismicRichTextProps,
} from "./react-server/PrismicRichText";

import { usePrismicContext } from "./usePrismicContext";

export type { PrismicRichTextProps };

export const PrismicRichText = function PrismicRichText<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	LinkResolverFunction extends prismic.LinkResolverFunction<any> = prismic.LinkResolverFunction,
>({ components, ...restProps }: PrismicRichTextProps<LinkResolverFunction>) {
	const context = usePrismicContext();

	const serializer = prismicR.composeSerializers(
		typeof components === "object"
			? prismicR.wrapMapSerializer(components)
			: components,
		typeof context.richTextComponents === "object"
			? prismicR.wrapMapSerializer(context.richTextComponents)
			: context.richTextComponents,
	);

	return (
		<ServerPrismicRichText
			components={serializer}
			internalLinkComponent={context.internalLinkComponent}
			externalLinkComponent={context.externalLinkComponent}
			{...restProps}
		/>
	);
};
