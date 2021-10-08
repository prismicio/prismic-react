import test from "ava";
import * as React from "react";
import * as prismicT from "@prismicio/types";

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
