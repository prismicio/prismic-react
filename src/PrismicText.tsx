import * as React from "react";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

/**
 * Props for `<PrismicText>`.
 */
export type PrismicTextProps = {
	/**
	 * The Prismic Rich Text field to render.
	 */
	field: prismicT.RichTextField | null | undefined;

	/**
	 * The string rendered when the field is empty. If a fallback is not given,
	 * `null` will be rendered.
	 */
	fallback?: string;

	/**
	 * The separator used between blocks. Defaults to `\n`.
	 */
	separator?: string;
};

/**
 * React component that renders content from a Prismic Rich Text field as plain text.
 *
 * @remarks
 * This component returns a React fragment with no wrapping element around the
 * content. If you need a wrapper, add a component around `<PrismicText>`.
 * @example Rendering a Rich Text field as plain text.
 *
 * ```jsx
 * <PrismicText field={document.data.content} />;
 * ```
 *
 * @param props - Props for the component.
 *
 * @returns The Rich Text field's content as plain text.
 *
 * @see Learn about Rich Text fields {@link https://prismic.io/docs/core-concepts/rich-text-title}
 */
export const PrismicText = (props: PrismicTextProps): JSX.Element | null => {
	return React.useMemo(() => {
		if (props.field) {
			const text = prismicH.asText(props.field, props.separator);

			return <>{text}</>;
		} else {
			return props.fallback != null ? <>{props.fallback}</> : null;
		}
	}, [props.field, props.fallback, props.separator]);
};
