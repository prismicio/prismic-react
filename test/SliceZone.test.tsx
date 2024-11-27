/* eslint-disable react/display-name */

import { it, expect, vi } from "vitest";
import { Slice } from "@prismicio/client";

import { renderJSON } from "./__testutils__/renderJSON";

import { SliceZone, TODOSliceComponent, SliceComponentProps } from "../src";

type StringifySliceComponentProps = {
	/**
	 * A unique identifier for the component to differentiate this component from
	 * other instances.
	 */
	id: string;
} & Partial<SliceComponentProps> &
	Record<string, unknown>;

const getDEV = vi.fn(() => true);
vi.mock("esm-env", async () => {
	const actual = await vi.importActual("esm-env");
	return {
		...actual,
		get DEV() {
			return getDEV();
		},
	};
});

const StringifySliceComponent = ({
	id,
	slice,
	index,
	slices,
	context,
	...restProps
}: StringifySliceComponentProps): JSX.Element => (
	<div data-id={id}>
		<div data-slice={JSON.stringify(slice)} />
		<div data-index={index} />
		<div data-slices={JSON.stringify(slices)} />
		<div data-context={JSON.stringify(context)} />
		<div data-rest-props={JSON.stringify(restProps)} />
	</div>
);

it("renders null by default", () => {
	const actual = renderJSON(<SliceZone />);

	expect(actual).toBe(null);
});

it("renders null if an empty Slice Zone is provided", () => {
	const actual = renderJSON(<SliceZone slices={[]} components={{}} />);

	expect(actual).toBe(null);
});

it("renders components for each Slice with correct component mapping", (ctx) => {
	const slices = [ctx.mock.value.slice(), ctx.mock.value.slice()];
	slices[0].slice_type = "foo";
	slices[1].slice_type = "bar";

	const actual = renderJSON(
		<SliceZone
			slices={slices}
			components={{
				foo: (props) => <StringifySliceComponent id="foo" {...props} />,
				bar: (props) => <StringifySliceComponent id="bar" {...props} />,
			}}
		/>,
	);
	const expected = renderJSON(
		<>
			<StringifySliceComponent
				id="foo"
				slice={slices[0]}
				index={0}
				slices={slices}
				context={{}}
			/>
			<StringifySliceComponent
				id="bar"
				slice={slices[1]}
				index={1}
				slices={slices}
				context={{}}
			/>
		</>,
	);

	expect(actual).toStrictEqual(expected);
});

it("passes context to each component if provided", (ctx) => {
	const slices = [ctx.mock.value.slice(), ctx.mock.value.slice()];
	slices[0].slice_type = "foo";
	slices[1].slice_type = "bar";
	const context = { foo: "bar" };

	const actual = renderJSON(
		<SliceZone
			slices={slices}
			components={{
				foo: (props) => <StringifySliceComponent id="foo" {...props} />,
				bar: (props) => <StringifySliceComponent id="bar" {...props} />,
			}}
			context={context}
		/>,
	);
	const expected = renderJSON(
		<>
			<StringifySliceComponent
				id="foo"
				slice={slices[0]}
				index={0}
				slices={slices}
				context={context}
			/>
			<StringifySliceComponent
				id="bar"
				slice={slices[1]}
				index={1}
				slices={slices}
				context={context}
			/>
		</>,
	);

	expect(actual).toStrictEqual(expected);
});

it("renders TODO component if component mapping is missing", (ctx) => {
	// The full component only renders in "development".
	const originalNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = "development";
	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	const slices = [
		ctx.mock.value.slice(),
		ctx.mock.value.slice(),
		// Testing a GraphQL Slice
		{ type: "baz" },
		// Testing a mapped Slice
		{ __mapped: true, id: "4", slice_type: "qux", abc: "123" },
	] as const;
	(slices[0] as Slice).slice_type = "foo";
	(slices[1] as Slice).slice_type = "bar";

	const actual = renderJSON(
		<SliceZone
			slices={slices}
			components={{
				foo: (props) => <StringifySliceComponent id="foo" {...props} />,
				// NOTE: The `bar` component is purposely left out of this it.
				// bar: (props) => <StringifySliceComponent id="bar" {...props} />,
			}}
		/>,
	);
	const expected = renderJSON(
		<>
			<StringifySliceComponent
				id="foo"
				slice={slices[0]}
				index={0}
				slices={slices}
				context={{}}
			/>
			<TODOSliceComponent slice={slices[1]} />
			<TODOSliceComponent slice={slices[2]} />
			<TODOSliceComponent slice={slices[3]} />
		</>,
	);

	expect(actual).toStrictEqual(expected);
	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[1],
	);
	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[2],
	);
	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[3],
	);

	consoleWarnSpy.mockRestore();
	process.env.NODE_ENV = originalNodeEnv;
});

it("TODO component renders null in production", (ctx) => {
	getDEV.mockReturnValue(false);

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	const slices = [ctx.mock.value.slice(), ctx.mock.value.slice()];
	slices[0].slice_type = "foo";
	slices[1].slice_type = "bar";

	const actual = renderJSON(
		<SliceZone
			slices={slices}
			components={{
				foo: (props) => <StringifySliceComponent id="foo" {...props} />,
				// NOTE: The `bar` component is purposely left out of this it.
				// bar: (props) => <StringifySliceComponent id="bar" {...props} />,
			}}
		/>,
	);
	const expected = renderJSON(
		<>
			<StringifySliceComponent
				id="foo"
				slice={slices[0]}
				index={0}
				slices={slices}
				context={{}}
			/>
			{null}
		</>,
	);

	expect(actual).toStrictEqual(expected);
	expect(consoleWarnSpy).not.toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[1],
	);

	consoleWarnSpy.mockRestore();

	getDEV.mockReturnValue(true);
});

it("supports the GraphQL API", () => {
	const slices = [{ type: "foo" }, { type: "bar" }] as const;

	const actual = renderJSON(
		<SliceZone
			slices={slices}
			components={{
				foo: (props) => <StringifySliceComponent id="foo" {...props} />,
				bar: (props) => <StringifySliceComponent id="bar" {...props} />,
			}}
		/>,
	);
	const expected = renderJSON(
		<>
			<StringifySliceComponent
				id="foo"
				slice={slices[0]}
				index={0}
				slices={slices}
				context={{}}
			/>
			<StringifySliceComponent
				id="bar"
				slice={slices[1]}
				index={1}
				slices={slices}
				context={{}}
			/>
		</>,
	);

	expect(actual).toStrictEqual(expected);
});

it("supports mapped slices from @prismicio/client's mapSliceZone()", (ctx) => {
	const slices = [
		{ __mapped: true, id: "1", slice_type: "foo", abc: "123" },
		{ __mapped: true, id: "2", slice_type: "bar", efg: "456" },
		ctx.mock.value.slice(),
	] as const;
	slices[2].slice_type = "baz";

	const actual = renderJSON(
		<SliceZone
			slices={slices}
			components={{
				foo: (props) => <StringifySliceComponent id="1" {...props} />,
				bar: (props) => <StringifySliceComponent id="2" {...props} />,
				baz: (props) => <StringifySliceComponent id="baz" {...props} />,
			}}
		/>,
	);
	const expected = renderJSON(
		<>
			<StringifySliceComponent id="1" slice_type="foo" abc="123" />
			<StringifySliceComponent id="2" slice_type="bar" efg="456" />
			<StringifySliceComponent
				id="baz"
				slice={slices[2]}
				index={2}
				slices={slices}
				context={{}}
			/>
		</>,
	);

	expect(actual).toStrictEqual(expected);
});
