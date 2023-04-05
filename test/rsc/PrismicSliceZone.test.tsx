/* eslint-disable react/display-name */

import { it, expect, vi } from "vitest";

import { renderJSON } from "../__testutils__/renderJSON";

import {
	SliceZone,
	TODOSliceComponent,
	SliceComponentProps,
} from "../../src/rsc";

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
