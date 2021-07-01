import * as React from "react";
import { useMemo } from "react";
import { RichTextField } from "@prismicio/types";
import { asText } from "@prismicio/helpers";

export type PrismicTextProps = {
	field: RichTextField;
	separator?: string;
};

export const PrismicText = (props: PrismicTextProps): JSX.Element => {
	const text = useMemo(
		() => asText(props.field, props.separator),
		[props.field, props.separator],
	);

	return <>{text}</>;
};
