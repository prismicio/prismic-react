import test from "ava";
import * as prismicR from "@prismicio/richtext";

import * as prismicH from "../src";

test("Element is an alias for @prismicio/richtext's Element", (t) => {
	t.is(prismicH.Element, prismicR.Element);
});

// TODO: Remove in v3.
test("Elements is a temporary alias for Element", (t) => {
	t.is(prismicH.Elements, prismicH.Element);
});
