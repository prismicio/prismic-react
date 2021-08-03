import * as prismicR from "@prismicio/richtext";

/**
 * A function mapping Rich Text block types to React Components. It is used to render Rich Text or Title fields.
 *
 * @see Templating rich text and title fields from Prismic {@link https://prismic.io/docs/technologies/templating-rich-text-and-title-fields-javascript}
 */
export type JSXFunctionSerializer =
	prismicR.RichTextFunctionSerializer<JSX.Element>;

/**
 * A map of Rich Text block types to React Components. It is used to render Rich Text or Title fields.
 *
 * @see Templating Rich Text and Title fields from Prismic {@link https://prismic.io/docs/technologies/templating-rich-text-and-title-fields-javascript}
 */
export type JSXMapSerializer = prismicR.RichTextMapSerializer<JSX.Element>;

/**
 * States of a `@prismicio/client` hook.
 */
export const enum PrismicClientHookState {
	/** The hook has not started fetching. */
	IDLE,

	/** The hook is fetching data. */
	PENDING,

	/** The hook sucessfully fetched data. */
	SUCCEEDED,

	/** The hook failed to fetch data. */
	FAILED,
}
