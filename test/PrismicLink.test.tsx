import test from "ava";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import * as prismicM from "@prismicio/mock";
import * as React from "react";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicLink, PrismicProvider, LinkProps } from "../src";

const Link = ({ href, rel, target }: LinkProps) => (
	<a data-href={href} data-rel={rel} data-target={target} />
);

test("renders a link from a document link field", (t) => {
	const field: prismicT.FilledLinkToDocumentField = {
		id: "id",
		uid: "uid",
		lang: "lang",
		tags: [],
		type: "page",
		link_type: prismicT.LinkType.Document,
		url: "url",
	};

	const actual = renderJSON(<PrismicLink field={field} />);
	const expected = renderJSON(
		<a href={field.url} rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders a link from a media link field", (t) => {
	const field: prismicT.FilledLinkToMediaField = {
		link_type: prismicT.LinkType.Media,
		url: "url",
		kind: "kind",
		name: "name",
		size: "size",
	};

	const actual = renderJSON(<PrismicLink field={field} />);
	const expected = renderJSON(
		<a href={field.url} rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders a link from a web link field", (t) => {
	const field: prismicT.FilledLinkToWebField = {
		url: "url",
		link_type: prismicT.LinkType.Web,
	};

	const actual = renderJSON(<PrismicLink field={field} />);
	const expected = renderJSON(
		<a href={field.url} rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders a link from a document with a URL", (t) => {
	const document = prismicM.value.document({
		seed: t.title,
		withURL: true,
	});

	const actual = renderJSON(<PrismicLink document={document} />);
	const expected = renderJSON(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		<a href={document.url!} rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders a link from a document using a Link Resolver", (t) => {
	const document = prismicM.value.document({
		seed: t.title,
		withURL: false,
		model: prismicM.model.customType({
			seed: t.title,
			fields: {
				uid: prismicM.model.uid({ seed: t.title }),
			},
		}),
	});
	const linkResolver: prismicH.LinkResolverFunction = (doc) => `/${doc.uid}`;

	const actual = renderJSON(
		<PrismicLink document={document} linkResolver={linkResolver} />,
	);
	const expected = renderJSON(
		<a href={`/${document.uid}`} rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders link from an href", (t) => {
	const actual = renderJSON(<PrismicLink href="href" />);
	const expected = renderJSON(
		<a href="href" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("prefers explicit href over field", (t) => {
	const field: prismicT.FilledLinkToDocumentField = {
		id: "id",
		uid: "uid",
		lang: "lang",
		tags: [],
		type: "page",
		link_type: prismicT.LinkType.Document,
		url: "url",
	};

	const actual = renderJSON(<PrismicLink href="href" field={field} />);
	const expected = renderJSON(
		<a href="href" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("uses link resolver provided via context", (t) => {
	const field: prismicT.FilledLinkToDocumentField = {
		id: "id",
		uid: "uid",
		lang: "lang",
		tags: [],
		type: "page",
		link_type: prismicT.LinkType.Document,
	};
	const linkResolver: prismicH.LinkResolverFunction = (doc) => `/${doc.uid}`;

	const actual = renderJSON(
		<PrismicProvider linkResolver={linkResolver}>
			<PrismicLink field={field} />
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<a href={`/${field.uid}`} rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("uses link resolver provided via props", (t) => {
	const field: prismicT.FilledLinkToDocumentField = {
		id: "id",
		uid: "uid",
		lang: "lang",
		tags: [],
		type: "page",
		link_type: prismicT.LinkType.Document,
	};
	const linkResolver: prismicH.LinkResolverFunction = (doc) => `/${doc.uid}`;

	const actual = renderJSON(
		<PrismicLink field={field} linkResolver={linkResolver} />,
	);
	const expected = renderJSON(
		<a href={`/${field.uid}`} rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if given a link field value with _blank target, use target and include rel='noopener noreferrer'", (t) => {
	const field: prismicT.FilledLinkToWebField = {
		url: "url",
		link_type: prismicT.LinkType.Web,
		target: "_blank",
	};

	const actual = renderJSON(<PrismicLink field={field} />);
	const expected = renderJSON(
		<a href={field.url} rel="noopener noreferrer" target="_blank" />,
	);

	t.deepEqual(actual, expected);
});

test("allow overriding default rel", (t) => {
	const field: prismicT.FilledLinkToWebField = {
		url: "url",
		link_type: prismicT.LinkType.Web,
		target: "_blank",
	};

	const actual = renderJSON(<PrismicLink field={field} rel="rel" />);
	const expected = renderJSON(
		// eslint-disable-next-line react/jsx-no-target-blank
		<a href={field.url} rel="rel" target="_blank" />,
	);

	t.deepEqual(actual, expected);
});

test("allow overriding default target", (t) => {
	const field: prismicT.FilledLinkToWebField = {
		url: "url",
		link_type: prismicT.LinkType.Web,
		target: "_blank",
	};

	const actual = renderJSON(<PrismicLink field={field} target="target" />);
	const expected = renderJSON(
		<a href={field.url} target="target" rel={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if manually given _blank to target, use rel'noopener norefferer", (t) => {
	const field: prismicT.FilledLinkToWebField = {
		url: "url",
		link_type: prismicT.LinkType.Web,
	};

	const actual = renderJSON(<PrismicLink field={field} target="_blank" />);
	const expected = renderJSON(
		<a href={field.url} target="_blank" rel={"noopener noreferrer"} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is internal and no internalComponent is given, render an <a>", (t) => {
	const actual = renderJSON(<PrismicLink href="/internal" />);
	const expected = renderJSON(
		<a href="/internal" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is internal and internalComponent is given, render internalComponent", (t) => {
	const actual = renderJSON(
		<PrismicLink href="/internal" internalComponent={Link} />,
	);
	const expected = renderJSON(
		<Link href="/internal" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is internal and internalComponent is given to the provider, render internalComponent from the provider", (t) => {
	const actual = renderJSON(
		<PrismicProvider internalLinkComponent={Link}>
			<PrismicLink href="/internal" />
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<Link href="/internal" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is internal and internalComponent is given to the provider and the component, render internalComponent from the component", (t) => {
	const actual = renderJSON(
		<PrismicProvider internalLinkComponent="div">
			<PrismicLink href="/internal" internalComponent={Link} />
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<Link href="/internal" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is external and no externalComponent is given, render an <a>", (t) => {
	const actual = renderJSON(<PrismicLink href="https://example.com" />);
	const expected = renderJSON(
		<a href="https://example.com" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is external and externalComponent is given, render externalComponent", (t) => {
	const actual = renderJSON(
		<PrismicLink href="https://example.com" externalComponent={Link} />,
	);
	const expected = renderJSON(
		<Link href="https://example.com" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is external and externalComponent is given to the provider, render externalComponent from the provider", (t) => {
	const actual = renderJSON(
		<PrismicProvider externalLinkComponent={Link}>
			<PrismicLink href="https://example.com" />
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<Link href="https://example.com" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is external and externalComponent is given to the provider and the component, render externalComponent from the component", (t) => {
	const actual = renderJSON(
		<PrismicProvider externalLinkComponent="div">
			<PrismicLink href="https://example.com" externalComponent={Link} />
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<Link href="https://example.com" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders null if field is provided undefined", (t) => {
	const actual = renderJSON(<PrismicLink field={undefined} />);

	t.is(actual, null);
});

test("renders null if document is provided undefined", (t) => {
	const actual = renderJSON(<PrismicLink document={undefined} />);

	t.is(actual, null);
});

test("renders null if href is provided undefined", (t) => {
	const actual = renderJSON(<PrismicLink href={undefined} />);

	t.is(actual, null);
});

test("forwards ref to internal component", (t) => {
	const CustomComponent =
		// eslint-disable-next-line react/display-name
		React.forwardRef((props: LinkProps, ref: React.Ref<HTMLInputElement>) => {
			return <input ref={ref} value={props.href} />;
		});

	let aRef = null as Element | null;
	let spanRef = null as Element | null;
	let customComponentRef = null as Element | null;

	renderJSON(
		<>
			<PrismicLink ref={(el) => (aRef = el)} href="/" />
			<PrismicLink
				ref={(el) => (spanRef = el)}
				internalComponent="span"
				href="/"
			/>
			<PrismicLink
				ref={(el) => (customComponentRef = el)}
				internalComponent={CustomComponent}
				href="/"
			/>
		</>,
		{
			createNodeMock: (element) => ({ tagName: element.type }),
		},
	);

	t.is(aRef?.tagName, "a");
	t.is(spanRef?.tagName, "span");
	t.is(customComponentRef?.tagName, "input");
});

test("forwards ref to external component", (t) => {
	const CustomComponent =
		// eslint-disable-next-line react/display-name
		React.forwardRef((props: LinkProps, ref: React.Ref<HTMLInputElement>) => {
			return <input ref={ref} value={props.href} />;
		});

	let aRef = null as Element | null;
	let spanRef = null as Element | null;
	let customComponentRef = null as Element | null;

	renderJSON(
		<>
			<PrismicLink ref={(el) => (aRef = el)} href="https://prismic.io" />
			<PrismicLink
				ref={(el) => (spanRef = el)}
				externalComponent="span"
				href="https://prismic.io"
			/>
			<PrismicLink
				ref={(el) => (customComponentRef = el)}
				externalComponent={CustomComponent}
				href="https://prismic.io"
			/>
		</>,
		{
			createNodeMock: (element) => ({ tagName: element.type }),
		},
	);

	t.is(aRef?.tagName, "a");
	t.is(spanRef?.tagName, "span");
	t.is(customComponentRef?.tagName, "input");
});
