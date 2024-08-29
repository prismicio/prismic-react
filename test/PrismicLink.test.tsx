import { it, expect } from "vitest";
import * as prismic from "@prismicio/client";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicLink, PrismicProvider, LinkProps } from "../src";

const Link = ({ href, rel, target }: LinkProps) => (
	<a data-href={href} data-rel={rel} data-target={target} />
);

it("uses link resolver provided via context", async (ctx) => {
	const field = ctx.mock.value.link({
		type: "Document",
	});
	const linkResolver: prismic.LinkResolverFunction = (doc) => `/${doc.uid}`;

	const actual = renderJSON(
		<PrismicProvider linkResolver={linkResolver}>
			<PrismicLink field={field} />
		</PrismicProvider>,
	);
	const expected = renderJSON(
		<a href={`/${field.uid}`} rel={undefined} target={undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it("if URL is internal and internalComponent is given to the provider, render internalComponent from the provider", async () => {
	const actual = renderJSON(
		<PrismicProvider internalLinkComponent={Link}>
			<PrismicLink href="/internal" />
		</PrismicProvider>,
	);
	const expected = renderJSON(<Link href="/internal" rel={undefined} />);

	expect(actual).toStrictEqual(expected);
});

it("if URL is internal and internalComponent is given to the provider and the component, render internalComponent from the component", async () => {
	const actual = renderJSON(
		<PrismicProvider internalLinkComponent={(props) => <div {...props} />}>
			<PrismicLink href="/internal" internalComponent={Link} />
		</PrismicProvider>,
	);
	const expected = renderJSON(<Link href="/internal" rel={undefined} />);

	expect(actual).toStrictEqual(expected);
});

it("if URL is external and externalComponent is given, render externalComponent", async () => {
	const actual = renderJSON(
		<PrismicLink href="https://example.com" externalComponent={Link} />,
	);
	const expected = renderJSON(<Link href="https://example.com" />);

	expect(actual).toStrictEqual(expected);
});

it("if URL is external and externalComponent is given to the provider, render externalComponent from the provider", async () => {
	const actual = renderJSON(
		<PrismicProvider externalLinkComponent={Link}>
			<PrismicLink href="https://example.com" />
		</PrismicProvider>,
	);
	const expected = renderJSON(<Link href="https://example.com" />);

	expect(actual).toStrictEqual(expected);
});

it("if URL is external and externalComponent is given to the provider and the component, render externalComponent from the component", async () => {
	const actual = renderJSON(
		<PrismicProvider externalLinkComponent={(props) => <div {...props} />}>
			<PrismicLink href="https://example.com" externalComponent={Link} />
		</PrismicProvider>,
	);
	const expected = renderJSON(<Link href="https://example.com" />);

	expect(actual).toStrictEqual(expected);
});

it("renders the link's text if no children are provided", async (ctx) => {
	const model = ctx.mock.model.link({ text: true });
	const field = ctx.mock.value.link({ type: "Web", model });
	const actual = renderJSON(<PrismicLink field={field} />);
	const expected = renderJSON(
		<a href={field.url} rel="noreferrer" target={field.target}>
			{field.text}
		</a>,
	);

	expect(actual).toStrictEqual(expected);
});

it("renders the given children, overriding the link's text", async (ctx) => {
	const model = ctx.mock.model.link({ text: true });
	const field = ctx.mock.value.link({ type: "Web", model });
	const children = ctx.mock.value.keyText();
	const actual = renderJSON(
		<PrismicLink field={field}>{children}</PrismicLink>,
	);
	const expected = renderJSON(
		<a href={field.url} rel="noreferrer" target={field.target}>
			{children}
		</a>,
	);

	expect(actual).toStrictEqual(expected);
});
