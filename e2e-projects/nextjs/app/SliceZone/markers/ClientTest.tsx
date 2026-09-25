"use client"

import { type SliceComponentProps, SliceZone } from "@prismicio/react"
import { type ReactNode, useState } from "react"

type TestSlice = {
	id: string
	slice_type: "element" | "fragment" | "empty"
}

const initialSlices: TestSlice[] = [
	{ id: "element-id", slice_type: "element" },
	{ id: "fragment-id", slice_type: "fragment" },
	{ id: "empty-id", slice_type: "empty" },
]

const components = {
	element: ({ slice }: SliceComponentProps<TestSlice>) => (
		<div data-testid="element-slice">{slice.id}</div>
	),
	fragment: ({ slice }: SliceComponentProps<TestSlice>) => (
		<>
			<span>{slice.id}-first</span>
			<span>{slice.id}-second</span>
		</>
	),
	empty: () => null,
}

export function ClientTest(): ReactNode {
	const [slices, setSlices] = useState(initialSlices)

	return (
		<div data-testid="client">
			<button onClick={() => setSlices((current) => current.toReversed())}>Reverse</button>
			<button onClick={() => setSlices((current) => current.slice(1))}>Remove first</button>
			<button
				onClick={() =>
					setSlices((current) => current.map((slice) => ({ ...slice, id: `${slice.id}-updated` })))
				}
			>
				Replace IDs
			</button>

			<div data-testid="client-output">
				<SliceZone slices={slices} components={components} />
			</div>
		</div>
	)
}
