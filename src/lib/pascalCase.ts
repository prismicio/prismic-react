import type { PascalCase } from "type-fest";

export const pascalCase = <Input>(input: string): PascalCase<Input> => {
	const camelCased = input.replace(/(?:-|_)(\w)/g, (_, c) => {
		return c ? c.toUpperCase() : "";
	});

	return (camelCased[0].toUpperCase() +
		camelCased.slice(1)) as PascalCase<Input>;
};
