/* eslint-disable react/display-name */

import { expect, vi } from "vitest";
import { render } from "vitest-browser-react";

import { it } from "./it";

import { SliceZone } from "../src";

it("renders null by default", () => {
	const screen = render(<SliceZone />);

	expect(screen.container.innerHTML).toBe("");
});

it("renders null if an empty Slice Zone is provided", () => {
	const screen = render(<SliceZone slices={[]} components={{}} />);

	expect(screen.container.innerHTML).toBe("");
});

it("renders components for each Slice with correct component mapping", ({
	mock,
}) => {
	const slices = [
		mock.value.slice({ type: "foo" }),
		mock.value.slice({ type: "bar" }),
	];
	const context = { baz: "qux" };

	const components = {
		foo: vi.fn(() => <div>foo</div>),
		bar: vi.fn(() => <div>bar</div>),
	};
	const screen = render(
		<SliceZone slices={slices} components={components} context={context} />,
	);

	expect(screen.container).toContainHTML("<div>foo</div><div>bar</div>");
	expect(components.foo).toHaveBeenCalledWith(
		{ slices, slice: slices[0], index: 0, context },
		{},
	);
	expect(components.bar).toHaveBeenCalledWith(
		{ slices, slice: slices[1], index: 1, context },
		{},
	);
});

it("renders TODO component if component mapping is missing", ({ mock }) => {
	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	const slices = [
		mock.value.slice({ type: "foo" }),
		mock.value.slice({ type: "bar" }),
		// Testing a GraphQL Slice
		{ type: "baz" },
		// Testing a mapped Slice
		{ __mapped: true, id: "4", slice_type: "qux", abc: "123" },
	] as const;

	const components = { foo: vi.fn(() => <div>foo</div>) };
	const screen = render(<SliceZone slices={slices} components={components} />);

	expect(
		screen
			.getByText("Could not find a component for Slice type “bar”")
			.element(),
	).toBeInTheDocument();
	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[1],
	);

	expect(
		screen
			.getByText("Could not find a component for Slice type “baz”")
			.element(),
	).toBeInTheDocument();
	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[2],
	);

	expect(
		screen
			.getByText("Could not find a component for Slice type “qux”")
			.element(),
	).toBeInTheDocument();
	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[3],
	);

	consoleWarnSpy.mockRestore();
});

it("supports the GraphQL API", () => {
	const slices = [{ type: "foo" }, { type: "bar" }] as const;
	const context = { baz: "qux" };

	const components = {
		foo: vi.fn(() => <div>foo</div>),
		bar: vi.fn(() => <div>bar</div>),
	};
	const screen = render(
		<SliceZone slices={slices} components={components} context={context} />,
	);

	expect(screen.container).toContainHTML("<div>foo</div><div>bar</div>");
	expect(components.foo).toHaveBeenCalledWith(
		{ slices, slice: slices[0], index: 0, context },
		{},
	);
	expect(components.bar).toHaveBeenCalledWith(
		{ slices, slice: slices[1], index: 1, context },
		{},
	);
});

it("supports mapped slices from @prismicio/client's mapSliceZone()", ({
	mock,
}) => {
	const slices = [
		{ __mapped: true, id: "1", slice_type: "foo", abc: "123" },
		{ __mapped: true, id: "2", slice_type: "bar", efg: "456" },
		mock.value.slice({ type: "baz" }),
	] as const;
	const { __mapped: _, ...foo } = slices[0];
	const { __mapped: __, ...bar } = slices[1];
	const context = { baz: "qux" };

	const components = {
		foo: vi.fn(() => <div>foo</div>),
		bar: vi.fn(() => <div>bar</div>),
		baz: vi.fn(() => <div>baz</div>),
	};
	const screen = render(
		<SliceZone slices={slices} components={components} context={context} />,
	);

	expect(screen.container).toContainHTML(
		"<div>foo</div><div>bar</div><div>baz</div>",
	);
	expect(components.foo).toHaveBeenCalledWith(foo, {});
	expect(components.bar).toHaveBeenCalledWith(bar, {});
	expect(components.baz).toHaveBeenCalledWith(
		{ slices, slice: slices[2], index: 2, context },
		{},
	);
});
