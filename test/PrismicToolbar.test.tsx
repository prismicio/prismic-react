import { it, expect } from "vitest";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicToolbar } from "../src";

it("adds a script element with the correct attributes to document.body", () => {
	const repositoryName = "repositoryName";

	globalThis.fetch = async () => new Response();

	renderJSON(<PrismicToolbar repositoryName={repositoryName} />);

	const script = document.body.querySelector(
		`[data-prismic-toolbar=""][data-repository-name="${repositoryName}"]`,
	);

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
