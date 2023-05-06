import { it, expect } from "vitest";

import * as reactServerLib from "../../src/react-server";
import * as defaultLib from "../../src";

it("has matching exports with the default lib", () => {
	expect(Object.keys(reactServerLib).sort()).toStrictEqual(
		Object.keys(defaultLib).sort(),
	);
});

it("Element is an alias for the default Element", () => {
	expect(reactServerLib.Element).toBe(defaultLib.Element);
});

it("PrismicImage is an alias for the default PrismicImage", () => {
	expect(reactServerLib.PrismicImage).toBe(defaultLib.PrismicImage);
});

it("PrismicText is an alias for the default PrismicText", () => {
	expect(reactServerLib.PrismicText).toBe(defaultLib.PrismicText);
});

it("PrismicToolbar is an alias for the default PrismicToolbar", () => {
	expect(reactServerLib.PrismicToolbar).toBe(defaultLib.PrismicToolbar);
});

it("SliceZone is an alias for the default SliceZone", () => {
	expect(reactServerLib.SliceZone).toBe(defaultLib.SliceZone);
});
