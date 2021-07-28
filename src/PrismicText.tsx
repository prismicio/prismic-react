import * as React from "react";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

/**
 * Props for `<PrismicText>`.
 */
export type PrismicTextProps = {
	/** The Prismic Rich Text field to render. */
	field: prismicT.RichTextField;

	/** The separator used between blocks. Defaults to \n`. */
	separator?: string;
};

/**
 * React component that renders content from a Prismic Rich Text field as plain text.
 *
 * @remarks This component returns a React fragment with no wrapping element around the content. If you need a wrapper, add a component around `<PrismicText>`.
 *
 * @see Learn about Rich Text fields {@link https://prismic.io/docs/core-concepts/rich-text-title}
 *
 * @example
 * Rendering a Rich Text field as plain text.
 *
 * <PrismicText field={document.data.content} />
 *
 * @param props Props for the component.
 *
 * @returns The Rich Text field's content as plain text.
 */
export const PrismicText = (props: PrismicTextProps): JSX.Element => {
	const text = React.useMemo(
		() => prismicH.asText(props.field, props.separator),
		[props.field, props.separator],
	);

	return <>{text}</>;
};
