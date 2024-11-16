import { it, expect } from "vitest";
import { Element as ClientElement } from "@prismicio/client/richtext";

import { Element } from "../src";

it("Element is an alias for @prismicio/client/richtext's Element", () => {
	expect(Element).toBe(ClientElement);
});
