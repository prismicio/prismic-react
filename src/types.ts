import {
	RichTextFunctionSerializer,
	RichTextMapSerializer,
} from "@prismicio/richtext";
import React from "react";

export type JSXFunctionSerializer = RichTextFunctionSerializer<JSX.Element>;
export type JSXMapSerializer = RichTextMapSerializer<JSX.Element>;

/**
 * Serializes a node from a rich text or title field with a function to HTML
 *
 * @see Templating rich text and title fields from Prismic {@link https://prismic.io/docs/technologies/templating-rich-text-and-title-fields-javascript}
 */
export type ComponentFunctionSerializer =
	RichTextFunctionSerializer<React.ReactNode>;

/**
 * Serializes a node from a rich text or title field with a map to HTML
 *
 * @see Templating rich text and title fields from Prismic {@link https://prismic.io/docs/technologies/templating-rich-text-and-title-fields-javascript}
 */
export type ComponentMapSerializer = RichTextMapSerializer<React.ReactNode>;
