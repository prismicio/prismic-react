"use client"

import { type SliceComponentProps, SliceZone } from "@prismicio/react"
import { type ReactNode, Activity, Suspense, use, useState } from "react"

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
	const [suspendCount, setSuspendCount] = useState(0)
	const [isActivityVisible, setIsActivityVisible] = useState(true)

	return (
		<div data-testid="client">
			<button onClick={() => setSuspendCount((current) => current + 1)}>Suspend</button>
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
				<Suspense fallback={<div data-testid="fallback">Loading</div>}>
					<Suspender count={suspendCount} />
					<SliceZone slices={slices} components={components} />
				</Suspense>
			</div>

			<button onClick={() => setIsActivityVisible((current) => !current)}>
				{isActivityVisible ? "Hide Activity" : "Show Activity"}
			</button>
			<div data-testid="activity-output">
				<Activity mode={isActivityVisible ? "visible" : "hidden"}>
					<SliceZone slices={initialSlices} components={components} />
				</Activity>
			</div>
		</div>
	)
}

const delays = new Map<number, Promise<void>>()

function Suspender(props: { count: number }): ReactNode {
	const { count } = props
	if (count === 0) return null

	let delay = delays.get(count)
	if (!delay) {
		delay = new Promise((resolve) => setTimeout(resolve, 100))
		delays.set(count, delay)
	}

	use(delay)

	return null
}
