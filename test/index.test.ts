import { it, expect } from "vitest";
import * as prismicR from "@prismicio/richtext";

import * as prismicH from "../src";

it("Element is an alias for @prismicio/richtext's Element", () => {
	expect(prismicH.Element).toBe(prismicR.Element);
});

// TODO: Remove in v3.
it("Elements is a temporary alias for Element", () => {
	expect(prismicH.Elements).toBe(prismicH.Element);
});
