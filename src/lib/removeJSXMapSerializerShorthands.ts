import { JSXMapSerializer, JSXMapSerializerWithShorthands } from "../types";

export const removeJSXMapSerializerShorthands = (
	serializer: JSXMapSerializerWithShorthands,
): JSXMapSerializer => {
	return Object.fromEntries(
		Object.entries(serializer).filter(([_, value]) => {
			return typeof value === "function";
		}),
	);
};
