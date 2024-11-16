import { it, expect, vi } from "vitest";
import * as prismic from "@prismicio/client";
import * as React from "react";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicLink, PrismicRichText } from "../src";

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
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h1 dir={undefined}>Heading 1</h1>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h2> if type is heading2", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading2,
			text: "Heading 2",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h2 dir={undefined}>Heading 2</h2>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h3> if type is heading3", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading3,
			text: "Heading 3",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h3 dir={undefined}>Heading 3</h3>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h4> if type is heading4", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading4,
			text: "Heading 4",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h4 dir={undefined}>Heading 4</h4>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h5> if type is heading5", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading5,
			text: "Heading 5",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h5 dir={undefined}>Heading 5</h5>);

	expect(actual).toStrictEqual(expected);
});

it("returns <h6> if type is heading6", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading6,
			text: "Heading 6",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<h6 dir={undefined}>Heading 6</h6>);

	expect(actual).toStrictEqual(expected);
});

it("returns <p /> if type is paragraph", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "Paragraph bold",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<p dir={undefined}>Paragraph bold</p>);

	expect(actual).toStrictEqual(expected);
});

it("returns <pre /> if type is preformatted", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.preformatted,
			text: "Preformatted",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(<pre>Preformatted</pre>);

	expect(actual).toStrictEqual(expected);
});

it("returns <strong /> if type is strong", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "strong",
			spans: [
				{
					start: 0,
					end: "strong".length,
					type: prismic.RichTextNodeType.strong,
				},
			],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p dir={undefined}>
			<strong>strong</strong>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <em /> if type is em", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "em",
			spans: [
				{
					start: 0,
					end: 2,
					type: prismic.RichTextNodeType.em,
				},
			],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p dir={undefined}>
			<em>em</em>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <ul> <li> </li> </ul> if type is listItem", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.listItem,
			text: "listItem",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<ul>
			<li dir={undefined}>listItem</li>
		</ul>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <ol> <li> </li> </ol> if type is listItem", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.oListItem,
			text: "oListItem",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<ol>
			<li dir={undefined}>oListItem</li>
		</ol>,
	);

	expect(actual).toStrictEqual(expected);
});

it("returns <image /> if type is image", async () => {
	const url = "url";
	const alt = "alt";
	const copyright = "copyright";

	const field: prismic.RichTextField = [
		{
			id: "",
			edit: {
				background: "transparent",
				x: 0,
				y: 0,
				zoom: 1,
			},
			type: prismic.RichTextNodeType.image,
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

	const field: prismic.RichTextField = [
		{
			id: "",
			edit: {
				background: "transparent",
				x: 0,
				y: 0,
				zoom: 1,
			},
			type: prismic.RichTextNodeType.image,
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

	const field: prismic.RichTextField = [
		{
			id: "",
			edit: {
				background: "transparent",
				x: 0,
				y: 0,
				zoom: 1,
			},
			type: prismic.RichTextNodeType.image,
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
	const oembed: prismic.EmbedField<
		prismic.RichOEmbed & { provider_name: string }
	> = {
		version: "1.0",
		embed_url: "https://example.com",
		type: "rich",
		html: "<marquee>Prismic is fun</marquee>",
		width: 100,
		height: 100,
		provider_name: "Prismic",
	};
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.embed,
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
	const data: prismic.FilledContentRelationshipField = {
		id: "id",
		uid: "uid",
		lang: "lang",
		tags: [],
		type: "page",
		link_type: prismic.LinkType.Document,
		url: "/url",
	};

	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "hyperlink",
			spans: [
				{
					start: 0,
					end: "hyperlink".length,
					type: prismic.RichTextNodeType.hyperlink,
					data,
				},
			],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p dir={undefined}>
			<a href={data.url} rel={undefined} target={undefined}>
				hyperlink
			</a>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

// TODO update isInternalURL to support an internal URL like "url"
it("Returns <PrismicLink /> with internalComponent from props", async () => {
	const data: prismic.FilledContentRelationshipField = {
		id: "id",
		uid: "uid",
		lang: "lang",
		tags: [],
		type: "page",
		link_type: prismic.LinkType.Document,
		url: "/url",
	};

	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "hyperlink",
			spans: [
				{
					start: 0,
					end: "hyperlink".length,
					type: prismic.RichTextNodeType.hyperlink,
					data,
				},
			],
		},
	];

	const actual = renderJSON(
		<PrismicRichText internalLinkComponent={Link} field={field} />,
	);
	const expected = renderJSON(
		<p dir={undefined}>
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
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "label",
			spans: [
				{
					type: prismic.RichTextNodeType.label,
					start: 0,
					end: 5,
					data,
				},
			],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p dir={undefined}>
			<span className={data.label}>label</span>
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("renders line breaks as <br />", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "line 1\nline 2",
			spans: [],
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<p dir={undefined}>
			line 1<br />
			line 2
		</p>,
	);

	expect(actual).toStrictEqual(expected);
});

it("includes `dir` attribute on right-to-left languages", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
			direction: "rtl",
		},
		{
			type: prismic.RichTextNodeType.heading2,
			text: "Heading 2",
			spans: [],
			direction: "rtl",
		},
		{
			type: prismic.RichTextNodeType.heading3,
			text: "Heading 3",
			spans: [],
			direction: "rtl",
		},
		{
			type: prismic.RichTextNodeType.heading4,
			text: "Heading 4",
			spans: [],
			direction: "rtl",
		},
		{
			type: prismic.RichTextNodeType.heading5,
			text: "Heading 5",
			spans: [],
			direction: "rtl",
		},
		{
			type: prismic.RichTextNodeType.heading6,
			text: "Heading 6",
			spans: [],
			direction: "rtl",
		},
		{
			type: prismic.RichTextNodeType.paragraph,
			text: "Paragraph",
			spans: [],
			direction: "rtl",
		},
		{
			type: prismic.RichTextNodeType.listItem,
			text: "listItem",
			spans: [],
			direction: "rtl",
		},
		{
			type: prismic.RichTextNodeType.oListItem,
			text: "oListItem",
			spans: [],
			direction: "rtl",
		},
	];

	const actual = renderJSON(<PrismicRichText field={field} />);
	const expected = renderJSON(
		<>
			<h1 dir="rtl">Heading 1</h1>
			<h2 dir="rtl">Heading 2</h2>
			<h3 dir="rtl">Heading 3</h3>
			<h4 dir="rtl">Heading 4</h4>
			<h5 dir="rtl">Heading 5</h5>
			<h6 dir="rtl">Heading 6</h6>
			<p dir="rtl">Paragraph</p>
			<ul>
				<li dir="rtl">listItem</li>
			</ul>
			<ol>
				<li dir="rtl">oListItem</li>
			</ol>
		</>,
	);

	expect(actual).toStrictEqual(expected);
});

it("renders components from components prop", async () => {
	const field: prismic.RichTextField = [
		{
			type: prismic.RichTextNodeType.paragraph,
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

it("warns if a className prop is provided", async () => {
	const field: prismic.RichTextField = [];

	// The warning only logs in "development".
	const originalNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = "development";

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	renderJSON(
		<PrismicRichText
			field={field}
			// @ts-expect-error - We are purposely passing an invalid prop to trigger the console wraning.
			className="foo"
		/>,
	);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/classname-is-not-a-valid-prop/),
		field,
	);

	consoleWarnSpy.mockRestore();
	process.env.NODE_ENV = originalNodeEnv;
});
