import { it, expect } from "vitest";

import * as rsc from "../../src/rsc";
import * as nonRSC from "../../src";

it("Element is an alias for @prismicio/richtext's Element", () => {
	expect(rsc.Element).toBe(nonRSC.Element);
});

it("PrismicImage is an alias for @prismicio/react's PrismicImage", () => {
	expect(rsc.PrismicImage).toBe(nonRSC.PrismicImage);
});
