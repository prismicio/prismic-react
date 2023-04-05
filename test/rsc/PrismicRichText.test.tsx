import { it, expect, vi } from "vitest";
import * as prismicT from "@prismicio/types";
import * as React from "react";

import { renderJSON } from "../__testutils__/renderJSON";

import { PrismicRichText, PrismicLink } from "../../src/rsc";

type LinkProps = {
	href: string;
	rel?: string;
	target?: string;
	children?: React.ReactNode;
};

const Link = ({ href, rel, target, children }: LinkProps) => (
	<a data-href={href} data-rel={rel} data-target={target}>
		{children}
	</a>
);

it("returns null if passed an empty field", async () => {
	const actualNull = renderJSON(<PrismicRichText field={null} />);
	const actualUndefined = renderJSON(<PrismicRichText field={undefined} />);
	const actualEmpty = renderJSON(<PrismicRichText field={[]} />);
	const actualEmpty2 = renderJSON(
		<PrismicRichText field={[{ type: "paragraph", text: "", spans: [] }]} />,
	);
	const expected = null;

	expect(actualNull).toStrictEqual(expected);
	expect(actualUndefined).toStrictEqual(expected);
	expect(actualEmpty).toStrictEqual(expected);
	expect(actualEmpty2).toStrictEqual(expected);
});

it("returns fallback if given when passed empty field", async () => {
	const fallback = <div>fallback</div>;
	const actualNull = renderJSON(
		<PrismicRichText field={null} fallback={fallback} />,
	);
	const actualUndefined = renderJSON(
		<PrismicRichText field={undefined} fallback={fallback} />,
	);
	const actualEmpty = renderJSON(
		<PrismicRichText field={[]} fallback={fallback} />,
	);
	const actualEmpty2 = renderJSON(
		<PrismicRichText
			field={[{ type: "paragraph", text: "", spans: [] }]}
			fallback={fallback}
		/>,
	);
	const expected = renderJSON(fallback);

	expect(actualNull).toStrictEqual(expected);
	expect(actualUndefined).toStrictEqual(expected);
	expect(actualEmpty).toStrictEqual(expected);
	expect(actualEmpty2).toStrictEqual(expected);
});

it("returns <h1> if type is heading1", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h1>Heading 1</h1>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h2> if type is heading2", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading2,
			text: "Heading 2",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h2>Heading 2</h2>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h3> if type is heading3", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading3,
			text: "Heading 3",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h3>Heading 3</h3>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h4> if type is heading4", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading4,
			text: "Heading 4",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h4>Heading 4</h4>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h4> if type is heading3", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading4,
			text: "Heading 4",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h4>Heading 4</h4>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h5> if type is heading4", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading5,
			text: "Heading 5",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h5>Heading 5</h5>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h6> if type is heading6", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading6,
			text: "Heading 6",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h6>Heading 6</h6>);

	expect(actual).toStrictEqual(expected);
});

it("returns <p /> if type is paragraph", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "Paragraph bold",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<p>Paragraph bold</p>);

	expect(actual).toStrictEqual(expected);
});

it("returns <pre /> if type is preformatted", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.preformatted,
			text: "Preformatted",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<pre>Preformatted</pre>);

	expect(actual).toStrictEqual(expected);
});

it("returns <strong /> if type is strong", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "strong",
			spans: [
				{
					start: 0,
					end: "strong".length,
					type: prismicT.RichTextNodeType.strong,
				},
			],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p>
			<strong>strong</strong>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <em /> if type is em", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "em",
			spans: [
				{
					start: 0,
					end: 2,
					type: prismicT.RichTextNodeType.em,
				},
			],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p>
			<em>em</em>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <ul> <li> </li> </ul> if type is listItem", async () => {
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

	expect(actual).toStrictEqual(expected);
});

it("returns <ol> <li> </li> </ol> if type is listItem", async () => {
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

	expect(actual).toStrictEqual(expected);
});

it("returns <image /> if type is image", async () => {
	const url = "url";
	const alt = "alt";
	const copyright = "copyright";

	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.image,
			url,
			alt,
			copyright,
			dimensions: {
				width: 100,
				height: 100,
			},
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p className="block-img">
			<img src={url} alt={alt} data-copyright={copyright} />
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <image /> with undefined copyright if not provided", async () => {
	const url = "url";
	const alt = "alt";

	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.image,
			url,
			alt,
			copyright: null,
			dimensions: {
				width: 100,
				height: 100,
			},
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p className="block-img">
			<img src={url} alt={alt} data-copyright={undefined} />
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <image /> wrapped in <PrismicLink />", async (ctx) => {
	const url = "url";
	const alt = "alt";
	const copyright = "copyright";

	const linkField = ctx.mock.value.link({ type: "Document" });

	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.image,
			url,
			alt,
			copyright,
			dimensions: {
				width: 100,
				height: 100,
			},
			linkTo: linkField,
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p className="block-img">
			<PrismicLink field={linkField}>
				<img src={url} alt={alt} data-copyright={copyright} />
			</PrismicLink>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <div /> with embedded html if type is embed", async () => {
	const oembed: prismicT.EmbedField<
		prismicT.RichOEmbed & { provider_name: string }
	> = {
		version: "1.0",
		embed_url: "https://example.com",
		type: "rich",
		html: "<marquee>Prismic is fun</marquee>",
		width: 100,
		height: 100,
		provider_name: "Prismic",
	};
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.embed,
			oembed,
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<div
			data-oembed={oembed.embed_url}
			data-oembed-type={oembed.type}
			data-oembed-provider={oembed.provider_name}
			dangerouslySetInnerHTML={{ __html: oembed.html as string }}
		/>,
	);

	expect(actual).toStrictEqual(expected);
});

it("Returns <PrismicLink /> when type is hyperlink", async () => {
	const data: prismicT.FilledLinkToDocumentField = {
		id: "id",
		uid: "uid",
		lang: "lang",
		tags: [],
		type: "page",
		link_type: prismicT.LinkType.Document,
		url: "/url",
	};

	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "hyperlink",
			spans: [
				{
					start: 0,
					end: "hyperlink".length,
					type: prismicT.RichTextNodeType.hyperlink,
					data,
				},
			],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p>
			<a href={data.url} rel={undefined} target={undefined}>
				hyperlink
			</a>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

// TODO update isInternalURL to support an internal URL like "url"
it("Returns <PrismicLink /> with internalComponent from props", async () => {
	const data: prismicT.FilledLinkToDocumentField = {
		id: "id",
		uid: "uid",
		lang: "lang",
		tags: [],
		type: "page",
		link_type: prismicT.LinkType.Document,
		url: "/url",
	};

	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "hyperlink",
			spans: [
				{
					start: 0,
					end: "hyperlink".length,
					type: prismicT.RichTextNodeType.hyperlink,
					data,
				},
			],
		},
	];

	const actual = renderJSON(
		<PrismicRichText internalLinkComponent={Link} field={field} />,
	);
	const expected = renderJSON(
		<p>
			<a data-href="/url" data-rel={undefined} data-target={undefined}>
				hyperlink
			</a>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <span /> with label className if type is label", async () => {
	const data = {
		label: "label",
	};
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "label",
			spans: [
				{
					type: prismicT.RichTextNodeType.label,
					start: 0,
					end: 5,
					data,
				},
			],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p>
			<span className={data.label}>label</span>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("renders line breaks as <br />", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "line 1\nline 2",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p>
			line 1<br />
			line 2
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("renders components from components prop", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "paragraph",
			spans: [],
		},
	];

	const actual = renderJSON(
		<PrismicRichText
			field={field}
			components={{ paragraph: ({ key }) => <p key={key}>paragraph</p> }}
		/>,
	);
	const expected = renderJSON(<p>paragraph</p>);

	expect(actual).toStrictEqual(expected);
});

it("keys are automatically applied to custom components", async () => {
	const field: prismicT.RichTextField = [
		{
			type: prismicT.RichTextNodeType.heading1,
			text: "heading1",
			spans: [],
		},
		{
			type: prismicT.RichTextNodeType.paragraph,
			text: "paragraph",
			spans: [],
		},
	];

	const consoleErrorSpy = vi
		.spyOn(console, "error")
		.mockImplementation(() => void 0);

	renderJSON(
		<PrismicRichText
			field={field}
			components={{
				heading1: ({ children }) => <h1>{children}</h1>,
				paragraph: ({ children }) => <p>{children}</p>,
			}}
		/>,
	);

	expect(consoleErrorSpy).not.toHaveBeenCalledWith(
		expect.stringMatching(/unique "key"/),
	);

	consoleErrorSpy.mockRestore();
});
