import { LinkResolverFunction } from "@prismicio/client";
import { composeSerializers, wrapMapSerializer } from "@prismicio/richtext";

import {
	JSXFunctionSerializer,
	JSXMapSerializer,
	JSXMapSerializerWithShorthands,
} from "../types";

import { createDefaultSerializer } from "./createDefaultSerializer";
import { LinkProps } from "../PrismicLink";
import { removeJSXMapSerializerShorthands } from "./removeJSXMapSerializerShorthands";

type WrapShorthandSerializerArgs<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TLinkResolverFunction extends LinkResolverFunction<any>,
> = {
	serializer: JSXMapSerializerWithShorthands | JSXFunctionSerializer;
	linkResolver: TLinkResolverFunction | undefined;
	internalLinkComponent?: React.ComponentType<LinkProps>;
	externalLinkComponent?: React.ComponentType<LinkProps>;
};

export const wrapShorthandSerializer = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TLinkResolverFunction extends LinkResolverFunction<any>,
>(
	args: WrapShorthandSerializerArgs<TLinkResolverFunction>,
): JSXFunctionSerializer => {
	const serializer = args.serializer;

	const defaultSerializerWithShorthands = createDefaultSerializer({
		providedSerializer: args.serializer,
		linkResolver: args.linkResolver,
		externalLinkComponent: args.externalLinkComponent,
		internalLinkComponent: args.internalLinkComponent,
	});
	const wrappedDefaultSerializerWithShorthands = wrapMapSerializer(
		defaultSerializerWithShorthands,
	);

	let shorthandSerializer: JSXMapSerializer | JSXFunctionSerializer;

	if (typeof serializer === "object") {
		shorthandSerializer = {};

		for (const type in args.serializer) {
			const typedType = type as keyof typeof args.serializer;

			if (typeof args.serializer[typedType] === "object") {
				shorthandSerializer[typedType] =
					defaultSerializerWithShorthands[typedType];
			}
		}
	} else {
		shorthandSerializer = (type, node, text, children, key) => {
			const definition = serializer(type, node, text, children, key);

			if (definition && "className" in definition) {
				return wrappedDefaultSerializerWithShorthands(
					type,
					node,
					text,
					children,
					key,
				);
			}
		};
	}

	return composeSerializers(
		typeof shorthandSerializer === "object"
			? wrapMapSerializer(shorthandSerializer)
			: shorthandSerializer,
		typeof args.serializer === "object"
			? wrapMapSerializer(removeJSXMapSerializerShorthands(args.serializer))
			: args.serializer,
	);
};
