import { RichTextMapSerializer } from "@prismicio/richtext";

import { JSXMapSerializer } from "../types";

export const removeJSXMapSerializerShorthands = (
	serializer: JSXMapSerializer,
): RichTextMapSerializer<JSX.Element> => {
	return Object.fromEntries(
		Object.entries(serializer).filter(([_, value]) => {
			return typeof value === "function";
		}),
	);
};
