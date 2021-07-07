import test from "ava";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import * as React from "react";
import * as sinon from "sinon";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicLink, PrismicProvider } from "../src";

test("renders a link from a document link field", (t) => {
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

test("renders a link from a media link field", (t) => {
	const field: prismicT.FilledLinkToMediaField = {
		link_type: prismicT.LinkType.Media,
		url: "url",
		kind: "kind",
		name: "name",
		size: "size",
	};
	const linkResolver: prismicH.LinkResolverFunction = (doc) => `/${doc.uid}`;

	const actual = renderJSON(
		<PrismicLink field={field} linkResolver={linkResolver} />,
	);
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
	const linkResolver: prismicH.LinkResolverFunction = (doc) => `/${doc.uid}`;

	const actual = renderJSON(
		<PrismicLink field={field} linkResolver={linkResolver} />,
	);
	const expected = renderJSON(
		<a href={field.url} rel={undefined} target={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders link from an href", (t) => {
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
		<a href="/uid" rel={undefined} target={undefined} />,
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

test.todo("uses link resolver provided via props", (t) => {});

test.todo("if given a link field value, use its target", (t) => {});

test.todo("if given a href, use the prop target", (t) => {});

test.todo(
	'if target is blank, use rel="noopener noreferrer" by default',
	(t) => {},
);

test.todo("allow overriding default rel", (t) => {});

test.todo("if URL is internal, render InternalComponent", (t) => {});

test.todo("if URL is external, render ExternalComponent", (t) => {});
