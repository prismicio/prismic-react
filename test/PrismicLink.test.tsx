import { describe, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { forwardRef } from "react";
import { PrismicDocument } from "@prismicio/client";

import { it } from "./it";

import { PrismicLink, LinkProps } from "../src";
import { isInternalURL } from "../src/PrismicLink";

it("renders a link from a document link field", async ({ mock }) => {
	const field = mock.value.link({ type: "Document" });
	field.url = "/url";

	const screen = render(<PrismicLink field={field} data-testid="link" />);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("href", field.url);
});

it("renders a link from a media link field", async ({ mock }) => {
	const field = mock.value.link({ type: "Media" });
	field.url = "/url";

	const screen = render(<PrismicLink field={field} data-testid="link" />);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("href", field.url);
});

it("renders a link from a web link field", async ({ mock }) => {
	const field = mock.value.link({ type: "Web" });
	field.url = "/url";

	const screen = render(<PrismicLink field={field} data-testid="link" />);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("href", field.url);
});

it("renders a link from a document with a URL", async ({ mock }) => {
	const doc = mock.value.document();
	doc.url = "/url";

	const screen = render(<PrismicLink document={doc} data-testid="link" />);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("href", doc.url);
});

it("renders a link from a document using a Link Resolver", async ({ mock }) => {
	const doc = mock.value.document({
		withURL: false,
		model: mock.model.customType({
			fields: {
				uid: mock.model.uid(),
			},
		}),
	});

	const screen = render(
		<PrismicLink
			document={doc}
			linkResolver={(doc) => `/${doc.uid}`}
			data-testid="link"
		/>,
	);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("href", `/${doc.uid}`);
});

it("renders link from an href", async () => {
	const screen = render(<PrismicLink href="/href" data-testid="link" />);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("href", "/href");
});

it("prefers explicit href over field", async ({ mock }) => {
	const field = mock.value.link();
	field.url = "/url";

	const screen = render(
		<PrismicLink href="/href" field={field} data-testid="link" />,
	);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("href", "/href");
});

it("uses link resolver provided via props", async ({ mock }) => {
	const field = mock.value.link({ type: "Document" });

	const screen = render(
		<PrismicLink
			field={field}
			linkResolver={(field) => `/${field.uid}`}
			data-testid="link"
		/>,
	);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("href", `/${field.uid}`);
});

it("allow overriding default rel", async ({ mock }) => {
	const field = mock.value.link();

	const screen = render(
		<PrismicLink field={field} rel="rel" data-testid="link" />,
	);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("rel", "rel");
});

it("allow overriding default rel with a function", async ({ mock }) => {
	const field = mock.value.link({ type: "Web" });
	const rel = vi.fn(() => "rel");

	const screen = render(
		<PrismicLink field={field} rel={rel} data-testid="link" />,
	);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("rel", "rel");
	expect(rel).toHaveBeenCalledWith({
		href: field.url,
		target: field.target,
		isExternal: true,
	});
});

it("allow overriding default target", async ({ mock }) => {
	const field = mock.value.link();

	const screen = render(
		<PrismicLink field={field} target="target" data-testid="link" />,
	);
	const link = screen.getByTestId("link").element();

	expect(link).toHaveAttribute("target", "target");
});

it("if target is not provided and the URL is external, target is not set", async () => {
	const screen = render(
		<PrismicLink href="https://example.com" data-testid="link" />,
	);
	const link = screen.getByTestId("link").element();

	expect(link).not.toHaveAttribute("target");
});

it("if URL is internal and no internalComponent is given, render an <a>", async () => {
	const screen = render(<PrismicLink href="/internal" data-testid="link" />);
	const link = screen.getByTestId("link").element();

	expect(link.tagName).toStrictEqual("A");
});

it("if URL is internal and internalComponent is given, render internalComponent", async () => {
	const Comp = vi.fn(() => <div>foo</div>);
	const screen = render(
		<PrismicLink href="/internal" internalComponent={Comp} data-testid="link">
			children
		</PrismicLink>,
	);

	expect(screen.container).toContainHTML("<div>foo</div>");
	expect(Comp).toHaveBeenCalledWith(
		{
			children: "children",
			href: "/internal",
			rel: undefined,
			"data-testid": "link",
		},
		{},
	);
});

it("if URL is external and no externalComponent is given, render an <a>", async () => {
	const screen = render(
		<PrismicLink href="https://example.com" data-testid="link" />,
	);
	const link = screen.getByTestId("link").element();

	expect(link.tagName).toStrictEqual("A");
});

it("if URL is external and externalComponent is given, render externalComponent", async () => {
	const Comp = vi.fn(() => <div>foo</div>);
	const screen = render(
		<PrismicLink
			href="https://example.com"
			externalComponent={Comp}
			data-testid="link"
		>
			children
		</PrismicLink>,
	);

	expect(screen.container).toContainHTML("<div>foo</div>");
	expect(Comp).toHaveBeenCalledWith(
		{
			children: "children",
			href: "https://example.com",
			rel: undefined,
			"data-testid": "link",
		},
		{},
	);
});

it("renders external component if provided field is undefined", async () => {
	const Comp = vi.fn(() => <div>foo</div>);
	const screen = render(
		<PrismicLink field={undefined} internalComponent={Comp} />,
	);

	expect(screen.container).toContainHTML("<div>foo</div>");
	expect(Comp).toHaveBeenCalledWith(
		{ children: undefined, href: "", rel: undefined },
		{},
	);
});

it("renders internal component if document is provided undefined", async () => {
	const Comp = vi.fn(() => <div>foo</div>);
	const screen = render(
		<PrismicLink document={undefined} internalComponent={Comp} />,
	);

	expect(screen.container).toContainHTML("<div>foo</div>");
	expect(Comp).toHaveBeenCalledWith(
		{ children: undefined, href: "", rel: undefined },
		{},
	);
});

it("renders internal component if provided href is falsey", async () => {
	const Comp = vi.fn(() => <div>foo</div>);
	const screen = render(<PrismicLink href="" internalComponent={Comp} />);

	expect(screen.container).toContainHTML("<div>foo</div>");
	expect(Comp).toHaveBeenCalledWith(
		{ children: undefined, href: "", rel: undefined },
		{},
	);
});

it("forwards ref", async () => {
	let defaultRef = null as Element | null;
	let internalRef = null as Element | null;
	let externalRef = null as Element | null;

	const InternalComp = forwardRef<HTMLDivElement, LinkProps>((_, ref) => (
		<div ref={ref} data-testid="internal" />
	));
	const ExternalComp = forwardRef<HTMLDivElement, LinkProps>((_, ref) => (
		<div ref={ref} data-testid="external" />
	));

	render(
		<>
			<PrismicLink
				ref={(el) => {
					defaultRef = el;
				}}
				href="/"
			/>
			<PrismicLink
				ref={(el) => {
					internalRef = el;
				}}
				internalComponent={InternalComp}
				href="/"
			/>
			<PrismicLink
				ref={(el) => {
					externalRef = el;
				}}
				internalComponent={ExternalComp}
				href="/"
			/>
		</>,
	);

	expect(defaultRef?.tagName).toBe("A");
	expect(internalRef).toHaveAttribute("data-testid", "internal");
	expect(externalRef).toHaveAttribute("data-testid", "external");
});

it("throws error if `link_type` is missing from a given field", async ({
	mock,
}) => {
	const field = mock.value.link();
	// @ts-expect-error - We are purposely deleting a non-optional field.
	delete field.link_type;

	const consoleErrorSpy = vi
		.spyOn(console, "error")
		.mockImplementation(() => void 0);

	expect(() => {
		render(<PrismicLink field={field} />);
	}).throws(/missing-link-properties/);

	expect(consoleErrorSpy).toHaveBeenCalledWith(
		expect.stringMatching(
			/this "field" prop value caused an error to be thrown./i,
		),
		field,
	);

	consoleErrorSpy.mockRestore();
});

it("warns if properties are missing from a given field", async () => {
	const field = { link_type: "Web", target: "_blank" };

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	render(<PrismicLink field={field} />);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/missing-link-properties/),
		field,
	);

	consoleWarnSpy.mockRestore();
});

it("does not warn if given field is empty", async ({ mock }) => {
	const field = mock.value.link({ state: "empty" });

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	render(<PrismicLink field={field} />);

	expect(consoleWarnSpy).not.toHaveBeenCalled();

	consoleWarnSpy.mockRestore();
});

it("warns if properties are missing from a given document", async () => {
	const document = {} as PrismicDocument;

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	render(<PrismicLink document={document} />);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/missing-link-properties/),
		document,
	);

	consoleWarnSpy.mockRestore();
});

describe("isInternalURL", () => {
	it("returns true for internal URLs", () => {
		expect(isInternalURL("/")).toBe(true);
		expect(isInternalURL("/internal")).toBe(true);
		expect(isInternalURL("#anchor")).toBe(true);
	});

	it("returns false for external URLs", () => {
		expect(isInternalURL("//example.com")).toBe(false);
		expect(isInternalURL("//example.com/image.png")).toBe(false);
		expect(isInternalURL("//example.com#anchor")).toBe(false);
		expect(isInternalURL("https://example.com")).toBe(false);
		expect(isInternalURL("mailto:example.com")).toBe(false);
		expect(isInternalURL("tel:example.com")).toBe(false);
		expect(isInternalURL("ftp:example.com")).toBe(false);
	});
});
