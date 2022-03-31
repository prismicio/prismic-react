// `PascalCase`-related types have been taken from the `type-fest` package.
//
// They are copied here to mininize dependencies in this project.
//
// See: https://github.com/sindresorhus/type-fest/blob/61c35052f09caa23de5eef96d95196375d8ed498/source/camel-case.d.ts

type WordSeparators = "-" | "_" | " ";

type Split<
	S extends string,
	Delimiter extends string,
> = S extends `${infer Head}${Delimiter}${infer Tail}`
	? [Head, ...Split<Tail, Delimiter>]
	: S extends Delimiter
	? []
	: [S];

type InnerCamelCaseStringArray<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Parts extends readonly any[],
	PreviousPart,
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
	? FirstPart extends undefined
		? ""
		: FirstPart extends ""
		? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
		: `${PreviousPart extends ""
				? FirstPart
				: Capitalize<FirstPart>}${InnerCamelCaseStringArray<
				RemainingParts,
				FirstPart
		  >}`
	: "";

type CamelCaseStringArray<Parts extends readonly string[]> = Parts extends [
	`${infer FirstPart}`,
	...infer RemainingParts,
]
	? Uncapitalize<`${FirstPart}${InnerCamelCaseStringArray<
			RemainingParts,
			FirstPart
	  >}`>
	: never;

type CamelCase<K> = K extends string
	? CamelCaseStringArray<
			Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
	  >
	: K;

/**
 * Converts a string literal to Pascal case.
 *
 * Taken from the `type-fest` package.
 *
 * See:
 * https://github.com/sindresorhus/type-fest/blob/61c35052f09caa23de5eef96d95196375d8ed498/source/pascal-case.d.ts
 */
export type PascalCase<Value> = CamelCase<Value> extends string
	? Capitalize<CamelCase<Value>>
	: CamelCase<Value>;

/**
 * Converts a string to Pascal case.
 *
 * @param input - The string to convert.
 *
 * @returns `input` as Pascal case.
 */
export const pascalCase = <Input extends string>(
	input: Input,
): PascalCase<Input> => {
	const camelCased = input.replace(/(?:-|_)(\w)/g, (_, c) => {
		return c ? c.toUpperCase() : "";
	});

	return (camelCased[0].toUpperCase() +
		camelCased.slice(1)) as PascalCase<Input>;
};
