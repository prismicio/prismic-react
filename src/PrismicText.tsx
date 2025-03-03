import { FC } from "react";
import { asText, isFilled, RichTextField } from "@prismicio/client";
import { DEV } from "esm-env";

import { devMsg } from "./lib/devMsg.js";

/** Props for `<PrismicText>`. */
export type PrismicTextProps = {
	/** The Prismic Rich Text field to render. */
	field: RichTextField | null | undefined;

	/**
	 * The string rendered when the field is empty. If a fallback is not given,
	 * `null` will be rendered.
	 */
	fallback?: string;

	/** The separator used between blocks. Defaults to `\n`. */
	separator?: string;
};

/**
 * React component that renders content from a Prismic Rich Text field as plain
 * text.
 *
 * @remarks
 * This component returns a React fragment with no wrapping element around the
 * content. If you need a wrapper, add a component around `<PrismicText>`.
 *
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
 * @see Learn about Rich Text fields {@link https://io/docs/core-concepts/rich-text-title}
 */
export const PrismicText: FC<PrismicTextProps> = (props) => {
	const { field, fallback, separator } = props;

	if (DEV) {
		if ("className" in props) {
			console.warn(
				`[PrismicText] className cannot be passed to <PrismicText> since it renders plain text without a wrapping component. For more details, see ${devMsg(
					"classname-is-not-a-valid-prop",
				)}.`,
				props.field,
			);
		}
	}

	if (typeof props.field === "string") {
		if (DEV) {
			console.error(
				`[PrismicText] The "field" prop only accepts a Rich Text or Title field's value but was provided a different type of field instead (e.g. a Key Text or Select field). You can resolve this error by rendering the field value inline without <PrismicText>. For more details, see ${devMsg(
					"prismictext-works-only-with-rich-text-and-title-fields",
				)}`,
				props.field,
			);
		}

		return null;
	}

	if (!isFilled.richText(field)) {
		return fallback != null ? <>{fallback}</> : null;
	}

	return <>{asText(field, { separator })}</>;
};
