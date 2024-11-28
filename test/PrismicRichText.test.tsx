import { expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { RichTextField, RichTextNodeType } from "@prismicio/client";

import { it } from "./it";

import { PrismicRichText } from "../src";

it("returns null if passed an empty field", async () => {
	const nullScreen = render(<PrismicRichText field={null} />);
	expect(nullScreen.container).toContainHTML("");

	const undefinedScreen = render(<PrismicRichText field={undefined} />);
	expect(undefinedScreen.container).toContainHTML("");

	const emptyScreen = render(<PrismicRichText field={[]} />);
	expect(emptyScreen.container).toContainHTML("");

	const empty2Screen = render(
		<PrismicRichText field={[{ type: "paragraph", text: "", spans: [] }]} />,
	);
	expect(empty2Screen.container).toContainHTML("");
});

it("returns fallback if given when passed empty field", async () => {
	const nullScreen = render(
		<PrismicRichText field={null} fallback="fallback" />,
	);
	expect(nullScreen.container).toContainHTML("");

	const undefinedScreen = render(
		<PrismicRichText field={undefined} fallback="fallback" />,
	);
	expect(undefinedScreen.container).toContainHTML("");

	const emptyScreen = render(
		<PrismicRichText field={[]} fallback="fallback" />,
	);
	expect(emptyScreen.container).toContainHTML("");

	const empty2Screen = render(
		<PrismicRichText
			field={[{ type: "paragraph", text: "", spans: [] }]}
			fallback="fallback"
		/>,
	);
	expect(empty2Screen.container).toContainHTML("");
});

it("returns <h1> if type is heading1", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<h1>Heading 1</h1>");
});

it("returns <h2> if type is heading2", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading2,
			text: "Heading 2",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<h2>Heading 2</h2>");
});

it("returns <h3> if type is heading3", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading3,
			text: "Heading 3",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<h3>Heading 3</h3>");
});

it("returns <h4> if type is heading4", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading4,
			text: "Heading 4",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<h4>Heading 4</h4>");
});

it("returns <h5> if type is heading5", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading5,
			text: "Heading 5",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<h5>Heading 5</h5>");
});

it("returns <h6> if type is heading6", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading6,
			text: "Heading 6",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<h6>Heading 6</h6>");
});

it("returns <p> if type is paragraph", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.paragraph,
			text: "Paragraph",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<p>Paragraph</p>");
});

it("returns <pre /> if type is preformatted", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.preformatted,
			text: "Preformatted",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<pre>Preformatted</pre>");
});

it("returns <strong /> if type is strong", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.paragraph,
			text: "strong",
			spans: [
				{
					start: 0,
					end: "strong".length,
					type: RichTextNodeType.strong,
				},
			],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<p><strong>strong</strong></p>");
});

it("returns <em /> if type is em", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.paragraph,
			text: "em",
			spans: [
				{
					start: 0,
					end: "em".length,
					type: RichTextNodeType.em,
				},
			],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<p><em>em</em></p>");
});

it("returns <ul> <li> </li> </ul> if type is listItem", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.listItem,
			text: "listItem",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<ul><li>listItem</li></ul>");
});

it("returns <ol> <li> </li> </ol> if type is oListItem", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.oListItem,
			text: "listItem",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML("<ol><li>listItem</li></ol>");
});

it("returns <img> if type is image", async ({ mock }) => {
	const image = mock.value.image();
	const field: RichTextField = [{ type: RichTextNodeType.image, ...image }];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML(
		`<p class="block-img"><img src="${image.url}" alt="${image.alt}" data-copyright="${image.copyright}" /></p>`,
	);
});

it("returns <image /> with undefined copyright if not provided", async ({
	mock,
}) => {
	const image = mock.value.image();
	image.copyright = null;
	const field: RichTextField = [{ type: RichTextNodeType.image, ...image }];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML(
		`<p class="block-img"><img src="${image.url}" alt="${image.alt}" /></p>`,
	);
});

it("returns <img> wrapped in <PrismicLink> when an image has a link", async ({
	mock,
}) => {
	const image = mock.value.image();
	image.copyright = null;
	const linkField = mock.value.link({ type: "Document" });
	linkField.url = "/url";
	const field: RichTextField = [
		{ type: RichTextNodeType.image, linkTo: linkField, ...image },
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML(
		`<p class="block-img"><a href="${linkField.url}"><img src="${image.url}" alt="${image.alt}" /></></p>`,
	);
});

it("returns <div> with embedded HTML if type is embed", async ({ mock }) => {
	const oembed = mock.value.embed({ html: "<div>oembed</div>" });
	const field: RichTextField = [
		{
			type: RichTextNodeType.embed,
			oembed,
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML(
		`<div data-oembed="${oembed.embed_url}" data-oembed-type="${oembed.type}">${oembed.html}</div>`,
	);
});

it("Returns <PrismicLink> when type is hyperlink", async ({ mock }) => {
	const data = mock.value.contentRelationship();
	data.url = "/url";
	const field: RichTextField = [
		{
			type: RichTextNodeType.paragraph,
			text: "hyperlink",
			spans: [
				{
					start: 0,
					end: "hyperlink".length,
					type: RichTextNodeType.hyperlink,
					data,
				},
			],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML(
		`<p><a href="${data.url}">hyperlink</a></p>`,
	);
});

// TODO update isInternalURL to support an internal URL like "url"
it("Returns <PrismicLink> with internalComponent from props", async ({
	mock,
}) => {
	const data = mock.value.contentRelationship();
	data.url = "/url";
	const field: RichTextField = [
		{
			type: RichTextNodeType.paragraph,
			text: "hyperlink",
			spans: [
				{
					start: 0,
					end: "hyperlink".length,
					type: RichTextNodeType.hyperlink,
					data,
				},
			],
		},
	];

	const screen = render(
		<PrismicRichText
			field={field}
			internalLinkComponent={() => <span>link</span>}
		/>,
	);

	expect(screen.container).toContainHTML("<p><span>link</span></p>");
});

it("returns <span /> with label className if type is label", async () => {
	const data = { label: "label" };
	const field: RichTextField = [
		{
			type: RichTextNodeType.paragraph,
			text: "label",
			spans: [
				{
					type: RichTextNodeType.label,
					start: 0,
					end: 5,
					data,
				},
			],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML(
		`<p><span class="${data.label}">label</span></p>`,
	);
});

it("renders line breaks as <br />", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.paragraph,
			text: "line 1\nline 2",
			spans: [],
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML(`<p>line 1<br/>line 2</p>`);
});

it("includes `dir` attribute on right-to-left languages", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
			direction: "rtl",
		},
		{
			type: RichTextNodeType.heading2,
			text: "Heading 2",
			spans: [],
			direction: "rtl",
		},
		{
			type: RichTextNodeType.heading3,
			text: "Heading 3",
			spans: [],
			direction: "rtl",
		},
		{
			type: RichTextNodeType.heading4,
			text: "Heading 4",
			spans: [],
			direction: "rtl",
		},
		{
			type: RichTextNodeType.heading5,
			text: "Heading 5",
			spans: [],
			direction: "rtl",
		},
		{
			type: RichTextNodeType.heading6,
			text: "Heading 6",
			spans: [],
			direction: "rtl",
		},
		{
			type: RichTextNodeType.paragraph,
			text: "Paragraph",
			spans: [],
			direction: "rtl",
		},
		{
			type: RichTextNodeType.listItem,
			text: "listItem",
			spans: [],
			direction: "rtl",
		},
		{
			type: RichTextNodeType.oListItem,
			text: "oListItem",
			spans: [],
			direction: "rtl",
		},
	];

	const screen = render(<PrismicRichText field={field} />);

	expect(screen.container).toContainHTML('<h1 dir="rtl">Heading 1</h1>');
	expect(screen.container).toContainHTML('<h2 dir="rtl">Heading 2</h2>');
	expect(screen.container).toContainHTML('<h3 dir="rtl">Heading 3</h3>');
	expect(screen.container).toContainHTML('<h4 dir="rtl">Heading 4</h4>');
	expect(screen.container).toContainHTML('<h5 dir="rtl">Heading 5</h5>');
	expect(screen.container).toContainHTML('<h6 dir="rtl">Heading 6</h6>');
	expect(screen.container).toContainHTML('<p dir="rtl">Paragraph</p>');
	expect(screen.container).toContainHTML(
		'<ul><li dir="rtl">listItem</li></ul>',
	);
	expect(screen.container).toContainHTML(
		'<ol><li dir="rtl">oListItem</li></ul>',
	);
});

it("renders components from components prop", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.paragraph,
			text: "paragraph",
			spans: [],
		},
	];

	const screen = render(
		<PrismicRichText
			field={field}
			components={{ paragraph: ({ key }) => <p key={key}>custom</p> }}
		/>,
	);

	expect(screen.container).toContainHTML("<p>custom</p>");
});

it("keys are automatically applied to custom components", async () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading1,
			text: "heading1",
			spans: [],
		},
		{
			type: RichTextNodeType.paragraph,
			text: "paragraph",
			spans: [],
		},
	];

	const consoleErrorSpy = vi
		.spyOn(console, "error")
		.mockImplementation(() => void 0);

	render(
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
	const field: RichTextField = [];

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	render(
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
});
