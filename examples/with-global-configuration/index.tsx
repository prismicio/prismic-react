/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import * as React from "react";
import * as prismicT from "@prismicio/types";
import {
	PrismicProvider,
	PrismicLink,
	LinkProps,
	JSXMapSerializer,
	PrismicRichText,
} from "@prismicio/react";
import { Link } from "react-router-dom";

// This is an example Link field value. It contains a URL internal to the app.
const linkField: prismicT.LinkField = {
	link_type: prismicT.LinkType.Web,
	url: "/internal-url",
};

// This is an example Rich Text field value. It contains a "Heading 1" block.
const richTextField: prismicT.RichTextField = [
	{
		type: prismicT.RichTextNodeType.heading1,
		text: "Lorem ipsum",
		spans: [],
	},
];

// This React component acts as a "shim" to convert the `href` prop provided by
// `<PrismicLink>` to the `to` prop required by react-router-dom's `<Link>`.
const LinkShim = ({ href, ...props }: LinkProps) => {
	return <Link to={href} {...props} />;
};

// This React component is used for headings. We will use it when rendering
// "Heading 1" blocks in Rich Text fields.
const Heading = ({ children }: { children: React.ReactNode }) => {
	return <h1 className="heading">{children}</h1>;
};

// This object contains components used to render a Rich Text field.
//
// Here we configure PrismicRichText to render the `<Heading>` component for
// "Heading 1" blocks.
const richTextComponents: JSXMapSerializer = {
	heading1: ({ children }) => <Heading>{children}</Heading>,
};

// This component acts as the main part of the example app. We use
// `<PrismicRichText>` and `<PrismicLink>` with example fields.
//
// Note that we do not need to pass configuration since it is provided to
// `<PrismicProvider>` higher in the tree (see the "App" component below).
const MyComponent = () => {
	return (
		<main>
			<PrismicRichText field={richTextField} />
			<PrismicLink field={linkField} />
		</main>
	);
};

// This React component acts as the app, including the top-level
// `<PrismicProvider>`. We pass global Prismic configuration to the provider at
// this level. By doing so, it becomes available automatically to all Prismic
// components lower in the tree.
export const App = (): JSX.Element => {
	return (
		<PrismicProvider
			internalLinkComponent={LinkShim}
			richTextComponents={richTextComponents}
		>
			<MyComponent />
		</PrismicProvider>
	);
};
