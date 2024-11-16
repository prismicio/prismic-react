import { expect, it } from "vitest";

import { isInternalURL } from "../src/PrismicLink";

it("returns true for internal URLs", () => {
	expect(isInternalURL("/")).toBe(true);
	expect(isInternalURL("/internal")).toBe(true);
	expect(isInternalURL("#anchor")).toBe(true);
});

it("returns false for external URLs", () => {
	expect(isInternalURL("//example.com")).toBe(false);
	expect(isInternalURL("//example.com/image.png")).toBe(false);
	expect(isInternalURL("//example.com#anchor")).toBe(false);
	expect(isInternalURL("https://example.com")).toBe(false);
	expect(isInternalURL("mailto:example.com")).toBe(false);
	expect(isInternalURL("tel:example.com")).toBe(false);
	expect(isInternalURL("ftp:example.com")).toBe(false);
});
