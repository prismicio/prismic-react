import { expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import * as prismic from "@prismicio/client";

import { PrismicText } from "../src";

import { it } from "./it";

it("returns string when passed RichTextField", () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
	];

	const screen = render(<PrismicText field={field} />);

	expect(screen.container.innerHTML).toBe("Heading 1");
});

it("returns null when passed empty field", () => {
	const nullScreen = render(<PrismicText field={null} />);
	expect(nullScreen.container).toContainHTML("");

	const undefinedScreen = render(<PrismicText field={undefined} />);
	expect(undefinedScreen.container).toContainHTML("");

	const emptyScreen = render(<PrismicText field={[]} />);
	expect(emptyScreen.container).toContainHTML("");

	const empty2Screen = render(
		<PrismicText field={[{ type: "paragraph", text: "", spans: [] }]} />,
	);
	expect(empty2Screen.container).toContainHTML("");
});

it("returns fallback when passed empty field", () => {
	const nullScreen = render(<PrismicText field={null} fallback="fallback" />);
	expect(nullScreen.container).toContainHTML("");

	const undefinedScreen = render(
		<PrismicText field={undefined} fallback="fallback" />,
	);
	expect(undefinedScreen.container).toContainHTML("");

	const emptyScreen = render(<PrismicText field={[]} fallback="fallback" />);
	expect(emptyScreen.container).toContainHTML("");

	const empty2Screen = render(
		<PrismicText
			field={[{ type: "paragraph", text: "", spans: [] }]}
			fallback="fallback"
		/>,
	);
	expect(empty2Screen.container).toContainHTML("");
});

it("throws error if passed a string-based field (e.g. Key Text or Select)", () => {
	const consoleErrorStub = vi
		.spyOn(console, "error")
		.mockImplementation(() => void 0);

	expect(() => {
		render(
			<PrismicText
				// @ts-expect-error - We are purposely not providing a correct field.
				field="not a Rich Text field"
			/>,
		);
	}).throws(/prismictext-works-only-with-rich-text-and-title-fields/);

	consoleErrorStub.mockRestore();
});

it("warns if a className prop is provided", async () => {
	const field: prismic.RichTextField = [];

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	render(
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
});
