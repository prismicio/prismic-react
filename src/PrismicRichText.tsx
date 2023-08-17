"use client";

import * as prismic from "@prismicio/client";
import * as prismicR from "@prismicio/richtext";

import { wrapShorthandSerializer } from "./lib/wrapShorthandSerializer";

import {
	PrismicRichText as ServerPrismicRichText,
	PrismicRichTextProps,
} from "./react-server/PrismicRichText";

import { usePrismicContext } from "./usePrismicContext";

export { PrismicRichTextProps };

export const PrismicRichText = function PrismicRichText<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	LinkResolverFunction extends prismic.LinkResolverFunction<any> = prismic.LinkResolverFunction,
>({ components, ...restProps }: PrismicRichTextProps<LinkResolverFunction>) {
	const context = usePrismicContext();

	const serializer = prismicR.composeSerializers(
		typeof components === "object"
			? wrapShorthandSerializer({
					serializer: components,
					linkResolver: restProps.linkResolver || context.linkResolver,
					internalLinkComponent:
						restProps.internalLinkComponent || context.internalLinkComponent,
					externalLinkComponent:
						restProps.externalLinkComponent || context.externalLinkComponent,
			  })
			: components,
		typeof context.richTextComponents === "object"
			? wrapShorthandSerializer({
					serializer: context.richTextComponents,
					linkResolver: restProps.linkResolver || context.linkResolver,
					internalLinkComponent:
						restProps.internalLinkComponent || context.internalLinkComponent,
					externalLinkComponent:
						restProps.externalLinkComponent || context.externalLinkComponent,
			  })
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
