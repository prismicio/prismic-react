// @vitest-environment happy-dom

import { it, expect } from "vitest";

import { renderJSON } from "./__testutils__/renderJSON";
import { md5 } from "./__testutils__/md5";

import { PrismicToolbar } from "../src";

/**
 * Retrieves the toolbar script for a specific repository.
 */
const getToolbarScript = (repositoryName: string): Element | null => {
	return document.body.querySelector(
		`[data-prismic-toolbar=""][data-repository-name="${repositoryName}"]`,
	);
};

it("adds a script element with the correct attributes to document.body", (ctx) => {
	const repositoryName = md5(ctx.meta.name);

	renderJSON(<PrismicToolbar repositoryName={repositoryName} type="new" />);

	const script = getToolbarScript(repositoryName);

	if (script instanceof HTMLScriptElement) {
		expect(script.getAttribute("src")).toBe(
			`https://static.cdn.prismic.io/prismic.js?repo=${repositoryName}&new=true`,
		);
		expect(script.getAttribute("defer")).toBe("");
		expect(script.dataset.repositoryName).toBe(repositoryName);
		expect(script.dataset.type).toBe("new");
	} else {
		expect.fail("The toolbar script element was not found");
	}
});

it("uses the new toolbar by default", (ctx) => {
	const repositoryName = md5(ctx.meta.name);

	renderJSON(<PrismicToolbar repositoryName={repositoryName} />);

	const script = getToolbarScript(repositoryName);

	if (script instanceof HTMLScriptElement) {
		expect(script.getAttribute("src")).toBe(
			`https://static.cdn.prismic.io/prismic.js?repo=${repositoryName}&new=true`,
		);
		expect(script.dataset.type).toBe("new");
	} else {
		expect.fail("The toolbar script element was not found");
	}
});

it('uses the legacy toolbar if type is set to "legacy"', (ctx) => {
	const repositoryName = md5(ctx.meta.name);

	renderJSON(<PrismicToolbar repositoryName={repositoryName} type="legacy" />);

	const script = getToolbarScript(repositoryName);

	if (script instanceof HTMLScriptElement) {
		expect(script.getAttribute("src")).toBe(
			`https://static.cdn.prismic.io/prismic.js?repo=${repositoryName}`,
		);
		expect(script.dataset.type).toBe("legacy");
	} else {
		expect.fail("The toolbar script element was not found");
	}
});

it("includes a Happy DOM patch to not execute scripts in it environments", (ctx) => {
	const repositoryName = md5(ctx.meta.name);

	renderJSON(<PrismicToolbar repositoryName={repositoryName} type="legacy" />);

	const script = getToolbarScript(repositoryName);

	if (script instanceof HTMLScriptElement) {
		expect(
			// @ts-expect-error - `_evaluateScript` is a Happy DOM-specific property.
			script._evaluateScript,
		).toBe(false);
	} else {
		expect.fail("The toolbar script element was not found");
	}
});
