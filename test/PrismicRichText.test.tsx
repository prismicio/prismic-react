import { it, expect } from "vitest";
import * as prismic from "@prismicio/client";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicRichText, PrismicProvider } from "../src";

it("renders components given to PrismicProvider", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading1,
			text: "heading1",
			spans: [],
		},
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "paragraph",
			spans: [],
		},
	];

	const actual = renderJSON(
		<PrismicProvider
			richTextComponents={{
				heading1: { className: "heading1" },
				paragraph: ({ key }) => <p key={key}>paragraph</p>,
			}}
		>
			<PrismicRichText field={field} />
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<>
			<h1 className="heading1">heading1</h1>
			<p>paragraph</p>
		</>,
	);

	expect(actual).toStrictEqual(expected);
});

it("components given to components prop overrides components given to PrismicProvider", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading1,
			text: "heading",
			spans: [],
		},
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "paragraph",
			spans: [],
		},
	];

	const actual = renderJSON(
		<PrismicProvider
			richTextComponents={{
				heading1: ({ key }) => <h1 key={key}>PrismicProvider heading1</h1>,
				paragraph: ({ key }) => <p key={key}>PrismicProvider paragraph</p>,
			}}
		>
			<PrismicRichText
				field={field}
				components={{
					paragraph: ({ key }) => <p key={key}>overridden paragraph</p>,
				}}
			/>
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<>
			<h1>PrismicProvider heading1</h1>
			<p>overridden paragraph</p>
		</>,
	);

	expect(actual).toStrictEqual(expected);
});
