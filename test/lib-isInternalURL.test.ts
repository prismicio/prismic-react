import test from "ava";

import { isInternalURL } from "../src/lib/isInternalURL";

test("returns true for internal URLs", (t) => {
	t.true(isInternalURL("/"));
	t.true(isInternalURL("/internal"));
	t.true(isInternalURL("#anchor"));
});

test("returns false for external URLs", (t) => {
	t.false(isInternalURL("//example.com"));
	t.false(isInternalURL("//example.com/image.png"));
	t.false(isInternalURL("//example.com#anchor"));
	t.false(isInternalURL("https://example.com"));
	t.false(isInternalURL("mailto:example.com"));
	t.false(isInternalURL("tel:example.com"));
	t.false(isInternalURL("ftp:example.com"));
});
