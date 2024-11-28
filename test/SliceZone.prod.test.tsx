import { expect, vi } from "vitest";
import { render } from "vitest-browser-react";

import { it } from "./it";

import { SliceZone } from "../src";

vi.mock("esm-env", async () => ({ DEV: false }));

it("TODO component renders null", async ({ mock }) => {
	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	const slices = [
		mock.value.slice({ type: "foo" }),
		mock.value.slice({ type: "bar" }),
	];

	const components = { foo: vi.fn(() => <div>foo</div>) };
	const screen = render(<SliceZone slices={slices} components={components} />);

	expect(screen.container).toContainHTML("<div>foo</div>");
	expect(consoleWarnSpy).not.toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[1],
	);

	consoleWarnSpy.mockRestore();
});
