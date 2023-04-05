import { it, expect } from "vitest";

import { getPrismicToolbarSrc } from "../../src/rsc";

it("returns a URL for the Prismic Toolbar script", () => {
	expect(getPrismicToolbarSrc("qwerty")).toBe(
		"https://static.cdn.prismic.io/prismic.js?new=true&repo=qwerty",
	);
});
