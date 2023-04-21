import { it, expect, vi } from "vitest";

it("foo");
// import * as prismicT from "@prismicio/types";
// import * as prismicH from "@prismicio/helpers";
// import * as React from "react";
//
// import { renderJSON } from "../__testutils__/renderJSON";
//
// import { PrismicLink, LinkProps } from "../../src/rsc";
//
// const Link = ({ href, rel, target }: LinkProps) => (
// 	<a data-href={href} data-rel={rel} data-target={target} />
// );
//
// it("renders a link from a document link field", async (ctx) => {
// 	const field = ctx.mock.value.link({ type: "Document" });
// 	field.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink field={field} />);
// 	const expected = renderJSON(
// 		<a href={field.url} rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("renders a link from a media link field", async (ctx) => {
// 	const field = ctx.mock.value.link({
// 		type: "Media",
// 	});
// 	field.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink field={field} />);
// 	const expected = renderJSON(
// 		<a href={field.url} rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("renders a link from a web link field", async (ctx) => {
// 	const field: prismicT.FilledLinkToWebField = ctx.mock.value.link({
// 		type: "Web",
// 	});
// 	field.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink field={field} />);
// 	const expected = renderJSON(
// 		<a href={field.url} rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("renders a link from a document with a URL", async (ctx) => {
// 	const document = ctx.mock.value.document();
// 	document.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink document={document} />);
// 	const expected = renderJSON(
// 		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// 		<a href={document.url!} rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("renders a link from a document using a Link Resolver", async (ctx) => {
// 	const document = ctx.mock.value.document({
// 		withURL: false,
// 		model: ctx.mock.model.customType({
// 			fields: {
// 				uid: ctx.mock.model.uid(),
// 			},
// 		}),
// 	});
// 	const linkResolver: prismicH.LinkResolverFunction = (doc) => `/${doc.uid}`;
//
// 	const actual = renderJSON(
// 		<PrismicLink document={document} linkResolver={linkResolver} />,
// 	);
// 	const expected = renderJSON(
// 		<a href={`/${document.uid}`} rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("renders link from an href", async () => {
// 	const actual = renderJSON(<PrismicLink href="/href" />);
// 	const expected = renderJSON(
// 		<a href="/href" rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("prefers explicit href over field", async (ctx) => {
// 	const field = ctx.mock.value.link();
// 	field.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink href="/href" field={field} />);
// 	const expected = renderJSON(
// 		<a href="/href" rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("uses link resolver provided via props", async (ctx) => {
// 	const field = ctx.mock.value.link({ type: "Document" });
// 	const linkResolver: prismicH.LinkResolverFunction = (doc) => `/${doc.uid}`;
//
// 	const actual = renderJSON(
// 		<PrismicLink field={field} linkResolver={linkResolver} />,
// 	);
// 	const expected = renderJSON(
// 		<a href={`/${field.uid}`} rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("if given a link field value with _blank target, use target and include rel='noopener noreferrer'", async (ctx) => {
// 	const field = ctx.mock.value.link({
// 		type: "Web",
// 		withTargetBlank: true,
// 	});
// 	field.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink field={field} />);
// 	const expected = renderJSON(
// 		<a href={field.url} rel="noopener noreferrer" target="_blank" />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("allow overriding default rel", async (ctx) => {
// 	const field = ctx.mock.value.link({
// 		type: "Web",
// 		withTargetBlank: true,
// 	});
// 	field.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink field={field} rel="rel" />);
// 	const expected = renderJSON(
// 		// eslint-disable-next-line react/jsx-no-target-blank
// 		<a href={field.url} rel="rel" target="_blank" />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("allow overriding default target", async (ctx) => {
// 	const field = ctx.mock.value.link({
// 		type: "Web",
// 		withTargetBlank: true,
// 	});
// 	field.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink field={field} target="target" />);
// 	const expected = renderJSON(
// 		<a href={field.url} target="target" rel={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it('if manually given _blank to target, use rel="noopener norefferer"', async (ctx) => {
// 	const field = ctx.mock.value.link({
// 		type: "Web",
// 		withTargetBlank: false,
// 	});
// 	field.url = "/url";
//
// 	const actual = renderJSON(<PrismicLink field={field} target="_blank" />);
// 	const expected = renderJSON(
// 		<a href={field.url} target="_blank" rel="noopener noreferrer" />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("if target is not provided and the URL is external, target is not set", async () => {
// 	const actual = renderJSON(<PrismicLink href="https://example.com" />);
// 	const expected = renderJSON(
// 		<a href="https://example.com" target={undefined} rel={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("if URL is internal and no internalComponent is given, render an <a>", async () => {
// 	const actual = renderJSON(<PrismicLink href="/internal" />);
// 	const expected = renderJSON(
// 		<a href="/internal" rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("if URL is internal and internalComponent is given, render internalComponent", async () => {
// 	const actual = renderJSON(
// 		<PrismicLink href="/internal" internalComponent={Link} />,
// 	);
// 	const expected = renderJSON(
// 		<Link href="/internal" rel={undefined} target={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("if URL is external and no externalComponent is given, render an <a>", async () => {
// 	const actual = renderJSON(<PrismicLink href="https://example.com" />);
// 	const expected = renderJSON(
// 		<a href="https://example.com" target={undefined} rel={undefined} />,
// 	);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("if URL is external and externalComponent is given, render externalComponent", async () => {
// 	const actual = renderJSON(
// 		<PrismicLink href="https://example.com" externalComponent={Link} />,
// 	);
// 	const expected = renderJSON(<Link href="https://example.com" />);
//
// 	expect(actual).toStrictEqual(expected);
// });
//
// it("renders null if field is provided undefined", async () => {
// 	const actual = renderJSON(<PrismicLink field={undefined} />);
//
// 	expect(actual).toBe(null);
// });
//
// it("renders null if document is provided undefined", async () => {
// 	const actual = renderJSON(<PrismicLink document={undefined} />);
//
// 	expect(actual).toBe(null);
// });
//
// it("renders null if href is provided undefined", async () => {
// 	const actual = renderJSON(<PrismicLink href={undefined} />);
//
// 	expect(actual).toBe(null);
// });
//
// it("forwards ref to internal component", async () => {
// 	const CustomComponent =
// 		// eslint-disable-next-line react/display-name
// 		React.forwardRef((props: LinkProps, ref: React.Ref<HTMLInputElement>) => {
// 			return <input ref={ref} value={props.href} />;
// 		});
//
// 	let aRef = null as Element | null;
// 	let customComponentRef = null as Element | null;
//
// 	renderJSON(
// 		<>
// 			<PrismicLink ref={(el) => (aRef = el)} href="/" />
// 			<PrismicLink
// 				ref={(el) => (customComponentRef = el)}
// 				internalComponent={CustomComponent}
// 				href="/"
// 			/>
// 		</>,
// 		{
// 			createNodeMock: (element) => ({ tagName: element.type }),
// 		},
// 	);
//
// 	expect(aRef?.tagName).toBe("a");
// 	expect(customComponentRef?.tagName).toBe("input");
// });
//
// it("forwards ref to external component", async () => {
// 	const CustomComponent =
// 		// eslint-disable-next-line react/display-name
// 		React.forwardRef((props: LinkProps, ref: React.Ref<HTMLInputElement>) => {
// 			return <input ref={ref} value={props.href} />;
// 		});
//
// 	let aRef = null as Element | null;
// 	let customComponentRef = null as Element | null;
//
// 	renderJSON(
// 		<>
// 			<PrismicLink ref={(el) => (aRef = el)} href="https://prismic.io" />
// 			<PrismicLink
// 				ref={(el) => (customComponentRef = el)}
// 				externalComponent={CustomComponent}
// 				href="https://prismic.io"
// 			/>
// 		</>,
// 		{
// 			createNodeMock: (element) => ({ tagName: element.type }),
// 		},
// 	);
//
// 	expect(aRef?.tagName).toBe("a");
// 	expect(customComponentRef?.tagName).toBe("input");
// });
//
// it("throws error if `link_type` is missing from a given field", async (ctx) => {
// 	const field = ctx.mock.value.link();
// 	// @ts-expect-error - We are purposely deleting a non-optional field.
// 	delete field.link_type;
//
// 	const consoleErrorSpy = vi
// 		.spyOn(console, "error")
// 		.mockImplementation(() => void 0);
//
// 	expect(() => {
// 		renderJSON(<PrismicLink field={field} />);
// 	}).throws(/missing-link-properties/);
//
// 	expect(consoleErrorSpy).toHaveBeenCalledWith(
// 		expect.stringMatching(
// 			/this "field" prop value caused an error to be thrown./i,
// 		),
// 		field,
// 	);
//
// 	consoleErrorSpy.mockRestore();
// });
//
// it("warns if properties are missing from a given field", async () => {
// 	const field = { link_type: prismicT.LinkType.Web, target: "_blank" };
//
// 	const consoleWarnSpy = vi
// 		.spyOn(console, "warn")
// 		.mockImplementation(() => void 0);
//
// 	renderJSON(<PrismicLink field={field} />);
//
// 	expect(consoleWarnSpy).toHaveBeenCalledWith(
// 		expect.stringMatching(/missing-link-properties/),
// 		field,
// 	);
//
// 	consoleWarnSpy.mockRestore();
// });
//
// it("does not warn if given field is empty", async (ctx) => {
// 	const field = ctx.mock.value.link({ state: "empty" });
//
// 	const consoleWarnSpy = vi
// 		.spyOn(console, "warn")
// 		.mockImplementation(() => void 0);
//
// 	renderJSON(<PrismicLink field={field} />);
//
// 	expect(consoleWarnSpy).not.toHaveBeenCalled();
//
// 	consoleWarnSpy.mockRestore();
// });
//
// it("warns if properties are missing from a given document", async () => {
// 	const document = {} as prismicT.PrismicDocument;
//
// 	const consoleWarnSpy = vi
// 		.spyOn(console, "warn")
// 		.mockImplementation(() => void 0);
//
// 	renderJSON(<PrismicLink document={document} />);
//
// 	expect(consoleWarnSpy).toHaveBeenCalledWith(
// 		expect.stringMatching(/missing-link-properties/),
// 		document,
// 	);
//
// 	consoleWarnSpy.mockRestore();
// });
