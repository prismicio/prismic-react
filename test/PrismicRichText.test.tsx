import test from "ava";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import * as React from "react";

import { PrismicRichText, PrismicProvider, PrismicRichTextProps } from "../src";

import fixsture from "./__fixtures__/enRichText.json";
import { renderJSON } from "./__testutils__/renderJSON";

test("returns h1 JSX if type is heading1", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading1,
			text: "Heading 1 bold text italic still bold normal",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<h1>Heading 1 bold text italic still bold normal</h1>,
	);
	t.deepEqual(actual, expected);
});

test("returns h2 JSX if type is heading2", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading2,
			text: "Heading 2 bold text italic still bold normal",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<h2>Heading 2 bold text italic still bold normal</h2>,
	);
	t.deepEqual(actual, expected);
});

test("returns h3 JSX if type is heading3", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading3,
			text: "Heading 3 bold text italic still bold normal",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<h3>Heading 3 bold text italic still bold normal</h3>,
	);
	t.deepEqual(actual, expected);
});

test("returns h4 JSX if type is heading4", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading4,
			text: "Heading 4 bold text italic still bold normal",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<h4>Heading 4 bold text italic still bold normal</h4>,
	);
	t.deepEqual(actual, expected);
});

test("returns h4 JSX if type is heading3", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading4,
			text: "Heading 4 bold text italic still bold normal",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<h4>Heading 4 bold text italic still bold normal</h4>,
	);
	t.deepEqual(actual, expected);
});

test("returns h5 JSX if type is heading4", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading5,
			text: "Heading 5 bold text italic still bold normal",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<h5>Heading 5 bold text italic still bold normal</h5>,
	);
	t.deepEqual(actual, expected);
});

test("returns h6 JSX if type is heading6", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading6,
			text: "Heading 6 bold text italic still bold normal",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<h6>Heading 6 bold text italic still bold normal</h6>,
	);
	t.deepEqual(actual, expected);
});

test("returns <p /> JSX if type is paragraph", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "Paragraph bold text italic still bold normal",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p>Paragraph bold text italic still bold normal</p>,
	);
	t.deepEqual(actual, expected);
});

test("returns <pre /> JSX if type is preformatted", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.preformatted,
			text: "Preformatted",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<pre>Preformatted</pre>);
	t.deepEqual(actual, expected);
});

test("returns <strong /> JSX if type is strong", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.strong,
			text: "Strong",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<strong>Strong</strong>);
	t.deepEqual(actual, expected);
});

test("returns <em /> JSX if type is em", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.em,
			text: "Embed",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<em>Embed</em>);
	t.deepEqual(actual, expected);
});

test("returns <ul> <li> </li> </ul> JSX if type is listItem", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.listItem,
			text: "listItem",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<ul>
			<li>listItem</li>
		</ul>,
	);
	t.deepEqual(actual, expected);
});

test("returns <ol> <li> </li> </ol> JSX if type is listItem", (t) => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.oListItem,
			text: "oListItem",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<ol>
			<li>oListItem</li>
		</ol>,
	);
	t.deepEqual(actual, expected);
});

// test("returns <image /> if type is image", (t) => {
// 	const field: PrismicRichTextProps = [
// 		{
// 			type: prismicT.RichTextNodeType.image,
// 			url: "url",
// 			alt: "alt",
// 			copyright: "copyright",
// 			dimensions: "hi",
// 		},
// 	];

// 	const actual = renderJSON(<PrismicRichText field={field} />);
// 	const expected = renderJSON(
// 		<img src={field.url} alt={field.alt} data-copyright={field.copyright} />,
// 	);

// 	t.deepEqual(actual, expected);
// });
