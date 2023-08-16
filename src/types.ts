import * as prismicR from "@prismicio/richtext";

/**
 * A function mapping Rich Text block types to React Components. It is used to
 * render Rich Text or Title fields.
 *
 * @see Templating rich text and title fields from Prismic {@link https://prismic.io/docs/technologies/templating-rich-text-and-title-fields-javascript}
 */
export type JSXFunctionSerializer =
	prismicR.RichTextFunctionSerializer<JSX.Element>;

/**
 * A shorthand definition for rich text block components.
 */
export type JSXMapSerializerShorthand = {
	className?: string;
};

/**
 * A map of Rich Text block types to React Components. It is used to render Rich
 * Text or Title fields.
 *
 * @see Templating Rich Text and Title fields from Prismic {@link https://prismic.io/docs/technologies/templating-rich-text-and-title-fields-javascript}
 */
export type JSXMapSerializer = {
	[P in keyof prismicR.RichTextMapSerializer<JSX.Element>]: P extends "span"
		? prismicR.RichTextMapSerializer<JSX.Element>[P]
		:
				| prismicR.RichTextMapSerializer<JSX.Element>[P]
				| JSXMapSerializerShorthand;
};

/**
 * States of a `@prismicio/client` hook.
 */
export type PrismicClientHookState = "idle" | "loading" | "loaded" | "failed";
