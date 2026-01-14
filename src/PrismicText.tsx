import type { FC } from "react";
import { asText, isFilled, type RichTextField } from "@prismicio/client";
import { DEV } from "esm-env";

import { devMsg } from "./lib/devMsg.js";

/** Props for `<PrismicText>`. */
export type PrismicTextProps = {
	/** The Prismic rich text field to render. */
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
 * Renders content from a Prismic rich text field as plain text (no HTML).
 *
 * @example
 *
 * ```tsx
 * <PrismicText field={slice.primary.text} />;
 * ```
 *
 * @see Learn how to display rich text as plain text or React components: {@link https://prismic.io/docs/fields/rich-text}
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
				`[PrismicText] The "field" prop only accepts a rich text field's value but was provided a different type of field instead (e.g. a key text or select field). You can resolve this error by rendering the field value inline without <PrismicText>. For more details, see ${devMsg(
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
