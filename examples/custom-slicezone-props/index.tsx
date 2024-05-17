/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import * as React from "react";
import {
	SliceZone,
	SliceComponentProps,
	SliceComponentType,
} from "@prismicio/react";

import { HeroSlice, ExampleSliceZone } from "./types";

// This is the contents of a Slice Zone field.
// Normally, this would be accessed at `document.data.body`, where `document`
// is a Prismic document and `body` is a Slice Zone.
const slices: ExampleSliceZone = [
	{
		id: "1",
		slice_type: "hero",
		slice_label: null,
		variation: "default",
		primary: {
			heading: "Lorem ipsum",
			buttonText: "Lorem ipsum",
			cards: [
				{
					title: "Lorem ipsum 1",
					content: "Lorem ipsum dolor sit amet",
				},
				{
					title: "Lorem ipsum 2",
					content: "Lorem ipsum dolor sit amet",
				},
			],
		},
		items: [],
		version: "1",
	},
	{
		id: "2",
		slice_type: "call_to_action",
		slice_label: null,
		variation: "default",
		primary: {
			text: "Lorem ipsum dolor sit amet",
		},
		items: [],
		version: "2",
	},
];

// This React component is rendered for Hero Slices.
// It accepts a Slice object as a prop.
const HeroSlice = ({ slice }: SliceComponentProps<HeroSlice>) => {
	return (
		<section>
			<h1>{slice.primary.heading}</h1>
			<button>{slice.primary.buttonText}</button>
			{slice.primary.cards.map((card, index) => (
				<div key={index}>
					<h2>{card.title}</h2>
					<p>{card.content}</p>
				</div>
			))}
		</section>
	);
};

// This React component is rendered for Call To Action Slices.
//
// It does **not** accept a Slice object as a prop.
//
// The SliceZome component will need to extract the content from within the
// Slice object before rendering.
const CallToActionSlice = ({
	text,
	disclaimer,
}: {
	text: string;
	disclaimer: string;
}) => {
	return (
		<section>
			<p>{text}</p>
			<small>{disclaimer}</small>
		</section>
	);
};

// This object contains a component for each type of Slice that can be rendered
// by `<SliceZone>`.
//
// It is important to define this object *outside* the React component that
// uses `<SliceZone>`. This ensures the React app will not re-render
// unnecessarily.
const components: Record<string, SliceComponentType> = {
	// Since HeroSlice accepts a `slice` prop, we can pass the component directly.
	hero: HeroSlice,

	// Since CallToActionSLice does not accept a `slice` prop, we must pass the
	// props it expects using content from within the Slice object.
	//
	// We can also pass arbitrary data as well, such as the `disclaimer` prop.
	call_to_action: ({ slice }) => (
		<CallToActionSlice text={slice.primary.text} disclaimer="foo" />
	),
};

// We render the Slice Zone using the `<SliceZone>` component by passing the
// list of Slices and component map.
export const App = (): JSX.Element => {
	return <SliceZone slices={slices} components={components} />;
};
