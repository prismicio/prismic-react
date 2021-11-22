/* eslint-disable react/display-name */

import test from "ava";
import * as React from "react";
import * as sinon from "sinon";

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

test("renders null by default", (t) => {
	const actual = renderJSON(<SliceZone />);

	t.is(actual, null);
});

test("renders null if an empty Slice Zone is provided", (t) => {
	const actual = renderJSON(<SliceZone slices={[]} components={{}} />);

	t.is(actual, null);
});

test("renders components for each Slice with correct component mapping", (t) => {
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

	t.deepEqual(actual, expected);
});

test("passes context to each component if provided", (t) => {
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

	t.deepEqual(actual, expected);
});

test("renders TODO component if component mapping is missing", (t) => {
	const consoleWarnStub = sinon.stub(console, "warn");

	const slices = [{ slice_type: "foo" }, { slice_type: "bar" }] as const;

	const actual = renderJSON(
		<SliceZone
			slices={slices}
			// @ts-expect-error - We are leaving `bar` out of the test on purpose.
			components={{
				foo: (props) => <StringifySliceComponent id="foo" {...props} />,
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

	t.deepEqual(actual, expected);
	t.true(
		consoleWarnStub.calledWith(sinon.match(/could not find a component/i)),
	);

	consoleWarnStub.restore();
});

test.skip("TODO component renders null in production", () => {
	// ts-eager does not allow esbuild configuration.
	// We cannot override the `process.env.NODE_ENV` inline replacement.
	// As a result, we cannot test for production currently.
});

test.skip("TODO component does not warn in production", () => {
	// ts-eager does not allow esbuild configuration.
	// We cannot override the `process.env.NODE_ENV` inline replacement.
	// As a result, we cannot test for production currently.
});

test("renders components from a resolver function for backwards compatibility with next-slicezone", async (t) => {
	const slices = [{ slice_type: "foo" }, { slice_type: "bar" }] as const;

	const resolver: SliceZoneResolver<typeof slices[number]> = ({
		sliceName,
	}) => {
		switch (sliceName) {
			case "foo": {
				return (props) => <StringifySliceComponent id="foo" {...props} />;
			}

			case "bar": {
				return (props) => <StringifySliceComponent id="bar" {...props} />;
			}
		}
	};

	const actual = renderJSON(<SliceZone slices={slices} resolver={resolver} />);
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

	t.deepEqual(actual, expected);
});
