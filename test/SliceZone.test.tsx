/* eslint-disable react/display-name */

import test from "ava";
import * as React from "react";
import * as sinon from "sinon";

import { renderJSON } from "./__testutils__/renderJSON";

import { SliceZone, MissingSliceComponent, SliceComponentProps } from "../src";

type StringifySliceComponentProps = {
	/** A unique identifier for the component to differentiate this component from other instances. */
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
			/>
			<StringifySliceComponent
				id="bar"
				slice={slices[1]}
				index={1}
				slices={slices}
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

test("renders default component if component mapping is missing", (t) => {
	const consoleWarnStub = sinon.stub(console, "warn");

	const slices = [{ slice_type: "foo" }, { slice_type: "bar" }] as const;

	const actual = renderJSON(
		<SliceZone
			slices={slices}
			components={{
				foo: (props) => <StringifySliceComponent id="foo" {...props} />,
				// We are leaving `bar` out of the test on purpose.
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
			/>
			<MissingSliceComponent slice={slices[1]} index={0} slices={slices} />
		</>,
	);

	t.deepEqual(actual, expected);
	t.true(
		consoleWarnStub.calledWith(sinon.match(/could not find a component/i)),
	);

	consoleWarnStub.restore();
});

test.serial("default component renders null in production", (t) => {
	process.env.NODE_ENV = "production";

	const actual = renderJSON(
		<SliceZone slices={[{ slice_type: "foo" }]} components={{}} />,
	);

	t.is(actual, null);

	process.env.NODE_ENV = "development";
});

test.serial("default component does not warn in production", (t) => {
	process.env.NODE_ENV = "production";

	const consoleWarnStub = sinon.stub(console, "warn");

	renderJSON(<SliceZone slices={[{ slice_type: "foo" }]} components={{}} />);

	t.false(consoleWarnStub.called);

	consoleWarnStub.restore();

	process.env.NODE_ENV = "development";
});
