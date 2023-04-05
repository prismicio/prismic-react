/* eslint-disable react/display-name */

import { it, expect, vi } from "vitest";

import { renderJSON } from "./__testutils__/renderJSON";

import {
	SliceZone,
	TODOSliceComponent,
	SliceComponentProps,
	SliceZoneResolver,
} from "../src";

type StringifySliceComponentProps = {
	/**
	 * A unique identifier for the component to differentiate this component from
	 * other instances.
	 */
	id: string;
} & SliceComponentProps;

const StringifySliceComponent = ({
	id,
	slice,
	index,
	slices,
	context,
}: StringifySliceComponentProps): JSX.Element => (
	<div data-id={id}>
		<div data-slice={JSON.stringify(slice)} />
		<div data-index={index} />
		<div data-slices={JSON.stringify(slices)} />
		<div data-context={JSON.stringify(context)} />
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

it("renders components for each Slice with correct component mapping", () => {
	const slices = [{ slice_type: "foo" }, { slice_type: "bar" }] as const;

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

it("passes context to each component if provided", () => {
	const slices = [{ slice_type: "foo" }, { slice_type: "bar" }] as const;
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

it("renders TODO component if component mapping is missing", () => {
	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	const slices = [{ slice_type: "foo" }, { slice_type: "bar" }] as const;

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
			<TODOSliceComponent
				slice={slices[1]}
				index={0}
				slices={slices}
				context={{}}
			/>
		</>,
	);

	expect(actual).toStrictEqual(expected);
	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/could not find a component/i),
		slices[1],
	);

	consoleWarnSpy.mockRestore();
});

it.skip("TODO component renders null in production", () => {
	// ts-eager does not allow esbuild configuration.
	// We cannot override the `process.env.NODE_ENV` inline replacement.
	// As a result, we cannot it for production currently.
});

it.skip("TODO component does not warn in production", () => {
	// ts-eager does not allow esbuild configuration.
	// We cannot override the `process.env.NODE_ENV` inline replacement.
	// As a result, we cannot it for production currently.
});

it("renders components from a resolver function for backwards compatibility with next-slicezone", async () => {
	const slices = [
		{
			slice_type: "foo_bar",
		},
		{
			slice_type: "barFoo",
		},
		{
			slice_type: "baz-qux",
		},
	] as const;

	const resolver: SliceZoneResolver<(typeof slices)[number]> = ({
		sliceName,
	}) => {
		switch (sliceName) {
			case "FooBar": {
				return (props) => <StringifySliceComponent id="foo_bar" {...props} />;
			}

			case "BarFoo": {
				return (props) => <StringifySliceComponent id="barFoo" {...props} />;
			}

			case "BazQux": {
				return (props) => <StringifySliceComponent id="baz-qux" {...props} />;
			}
		}
	};

	const actual = renderJSON(<SliceZone slices={slices} resolver={resolver} />);
	const expected = renderJSON(
		<>
			<StringifySliceComponent
				id="foo_bar"
				slice={slices[0]}
				index={0}
				slices={slices}
				context={{}}
			/>
			<StringifySliceComponent
				id="barFoo"
				slice={slices[1]}
				index={1}
				slices={slices}
				context={{}}
			/>
			<StringifySliceComponent
				id="baz-qux"
				slice={slices[2]}
				index={2}
				slices={slices}
				context={{}}
			/>
		</>,
	);

	expect(actual).toStrictEqual(expected);
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
