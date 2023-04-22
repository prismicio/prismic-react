import { it, expect } from "vitest";
import * as prismicT from "@prismicio/types";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicRichText, PrismicProvider } from "../src";

it("renders components given to PrismicProvider", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "paragraph",
			spans: [],
		},
	];

	const actual = renderJSON(
		<PrismicProvider
			richTextComponents={{
				paragraph: ({ key }) => <p key={key}>paragraph</p>,
			}}
		>
			<PrismicRichText field={field} />
		</PrismicProvider>,
	);
	const expected = renderJSON(<p>paragraph</p>);

	expect(actual).toStrictEqual(expected);
});

it("components given to components prop overrides components given to PrismicProvider", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading1,
			text: "heading",
			spans: [],
		},
		{
			type: prismicT.RichTextNodeType.paragraph,
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
