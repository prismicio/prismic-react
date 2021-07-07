import test from "ava";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import * as React from "react";
import * as sinon from "sinon";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicLink, PrismicProvider } from "../src";

type LinkProps = {
	href: string;
	rel?: string;
	target?: string;
};

const Link = ({ href, rel, target }: LinkProps) => (
	<span data-href={href} data-rel={rel} data-target={target}>
		Link
	</span>
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

test("renders link from an href", (t) => {
	const actual = renderJSON(<PrismicLink href="href" />);
	const expected = renderJSON(
		<a href="href" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test.skip("uses link resolver provided via context", (t) => {
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
			<PrismicLink field={field} />,
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<PrismicProvider linkResolver={linkResolver}>
			<a href={`/${field.uid}`} rel={undefined} target={undefined} />
		</PrismicProvider>,
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

test("if URL is internal, render default InternalComponent", (t) => {
	const actual = renderJSON(<PrismicLink href="/internal" />);

	const expected = renderJSON(
		<a href="/internal" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is internal, render InternalComponent", (t) => {
	const actual = renderJSON(
		<PrismicLink href="/internal" internalComponent={Link} />,
	);

	const expected = renderJSON(
		<Link href="/internal" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("if URL is external, render ExternalComponent", (t) => {
	const actual = renderJSON(
		<PrismicLink href="internal" externalComponent={Link} />,
	);

	const expected = renderJSON(
		<Link href="internal" rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test.todo("if URL is internal, render internal component from the provider");

test.todo("if URL is external, render external component from the provider");
