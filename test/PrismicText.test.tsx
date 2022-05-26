import test from "ava";
import * as React from "react";
import * as prismicT from "@prismicio/types";
import * as sinon from "sinon";

import { PrismicText } from "../src";

import { renderJSON } from "./__testutils__/renderJSON";

test("returns string when passed RichTextField", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicText field={field} />);
	const expected = renderJSON(<>Heading 1</>);

	t.deepEqual(actual, expected);
});

test("returns null when passed empty field", (t) => {
	const actualNull = renderJSON(<PrismicText field={null} />);
	const actualUndefined = renderJSON(<PrismicText field={undefined} />);
	const actualEmpty = renderJSON(
		<PrismicText field={[{ type: "paragraph", text: "", spans: [] }]} />,
	);
	const expected = null;

	t.deepEqual(actualNull, expected);
	t.deepEqual(actualUndefined, expected);
	t.deepEqual(actualEmpty, expected);
});

test("returns fallback when passed empty field", (t) => {
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

	t.deepEqual(actualNull, expected);
	t.deepEqual(actualUndefined, expected);
	t.deepEqual(actualEmpty, expected);
});

test("throws error if passed a string-based field (e.g. Key Text or Select)", (t) => {
	// Used to supress logging the error in this test.
	const consoleErrorStub = sinon.stub(console, "error");

	t.throws(() =>
		renderJSON(
			<PrismicText
				// @ts-expect-error - We are purposely not providing a correct field.
				field="not a Rich Text field"
			/>,
		),
	);

	consoleErrorStub.restore();
});
