import { it, expect } from "vitest";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicToolbar } from "../src";

/** Retrieves the toolbar script for a specific repository. */
const getToolbarScript = (repositoryName: string): Element | null => {
	return document.body.querySelector(
		`[data-prismic-toolbar=""][data-repository-name="${repositoryName}"]`,
	);
};

it("adds a script element with the correct attributes to document.body", () => {
	const repositoryName = "repositoryName";

	renderJSON(<PrismicToolbar repositoryName={repositoryName} />);

	const script = getToolbarScript(repositoryName);

	if (script instanceof HTMLScriptElement) {
		expect(script.getAttribute("src")).toBe(
			`https://static.cdn.prismic.io/prismic.js?new=true&repo=${repositoryName}`,
		);
		expect(script.getAttribute("defer")).toBe("");
		expect(script.dataset.repositoryName).toBe(repositoryName);
	} else {
		expect.fail("The toolbar script element was not found");
	}
});

it("includes a Happy DOM patch to not execute scripts in test environments", () => {
	const repositoryName = "repositoryName";

	renderJSON(<PrismicToolbar repositoryName={repositoryName} />);

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
