import { expect } from "vitest";
import { render } from "vitest-browser-react";

import { it } from "./it";

import { PrismicToolbar } from "../src";

it("adds a script element with the correct attributes to document.body", ({
	repositoryName,
}) => {
	const screen = render(<PrismicToolbar repositoryName={repositoryName} />);

	const script = screen.baseElement.querySelector(
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
