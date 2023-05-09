import { it, expect, vi } from "vitest";
import * as prismic from "@prismicio/client";

import { PrismicText } from "../src";

import { renderJSON } from "./__testutils__/renderJSON";

it("returns string when passed RichTextField", () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicText field={field} />);
	const expected = renderJSON(<>Heading 1</>);

	expect(actual).toStrictEqual(expected);
});

it("returns null when passed empty field", () => {
	const actualNull = renderJSON(<PrismicText field={null} />);
	const actualUndefined = renderJSON(<PrismicText field={undefined} />);
	const actualEmpty = renderJSON(
		<PrismicText field={[{ type: "paragraph", text: "", spans: [] }]} />,
	);
	const expected = null;

	expect(actualNull).toStrictEqual(expected);
	expect(actualUndefined).toStrictEqual(expected);
	expect(actualEmpty).toStrictEqual(expected);
});

it("returns fallback when passed empty field", () => {
	const actualNull = renderJSON(
		<PrismicText field={null} fallback="fallback" />,
	);
	const actualUndefined = renderJSON(
		<PrismicText field={undefined} fallback="fallback" />,
	);
	const actualEmpty = renderJSON(
		<PrismicText
			field={[{ type: "paragraph", text: "", spans: [] }]}
			fallback="fallback"
		/>,
	);
	const expected = renderJSON(<>fallback</>);

	expect(actualNull).toStrictEqual(expected);
	expect(actualUndefined).toStrictEqual(expected);
	expect(actualEmpty).toStrictEqual(expected);
});

it("throws error if passed a string-based field (e.g. Key Text or Select)", () => {
	// The error is only thrown  in "development".
	const originalNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = "development";

	// Used to supress logging the error in this it.
	const consoleErrorStub = vi
		.spyOn(console, "error")
		.mockImplementation(() => void 0);

	expect(() => {
		renderJSON(
			<PrismicText
				// @ts-expect-error - We are purposely not providing a correct field.
				field="not a Rich Text field"
			/>,
		);
	}).throws(/prismictext-works-only-with-rich-text-and-title-fields/);

	consoleErrorStub.mockRestore();
	process.env.NODE_ENV = originalNodeEnv;
});

it("warns if a className prop is provided", async () => {
	const field: prismic.RichTextField = [];

	// The warning only logs in "development".
	const originalNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = "development";

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	renderJSON(
		<PrismicText
			field={field}
			// @ts-expect-error - We are purposely passing an invalid prop to trigger the console wraning.
			className="foo"
		/>,
	);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/classname-is-not-a-valid-prop/),
		field,
	);

	consoleWarnSpy.mockRestore();
	process.env.NODE_ENV = originalNodeEnv;
});
