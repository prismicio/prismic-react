import test from "ava";
import * as React from "react";
import browserEnv from "browser-env";

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

// Polyfill the runtime with a simulated DOM.
test.before(() => {
	browserEnv();
});

test.serial(
	"adds a script element with the correct attributes to document.body",
	(t) => {
		const repositoryName = md5(t.title);

		renderJSON(<PrismicToolbar repositoryName={repositoryName} type="new" />);

		const script = getToolbarScript(repositoryName);

		if (script instanceof HTMLScriptElement) {
			t.is(
				script.getAttribute("src"),
				`https://static.cdn.prismic.io/prismic.js?repositoryName=${repositoryName}&type=new`,
			);
			t.is(script.getAttribute("defer"), "");
			t.is(script.dataset.repositoryName, repositoryName);
			t.is(script.dataset.type, "new");
		} else {
			t.fail("The toolbar script element was not found");
		}
	},
);

test.serial("uses the new toolbar by default", (t) => {
	const repositoryName = md5(t.title);

	renderJSON(<PrismicToolbar repositoryName={repositoryName} />);

	const script = getToolbarScript(repositoryName);

	if (script instanceof HTMLScriptElement) {
		t.is(
			script.getAttribute("src"),
			`https://static.cdn.prismic.io/prismic.js?repositoryName=${repositoryName}&type=new`,
		);
		t.is(script.dataset.type, "new");
	} else {
		t.fail("The toolbar script element was not found");
	}
});

test('uses the legacy toolbar if type is set to "legacy"', (t) => {
	const repositoryName = md5(t.title);

	renderJSON(<PrismicToolbar repositoryName={repositoryName} type="legacy" />);

	const script = getToolbarScript(repositoryName);

	if (script instanceof HTMLScriptElement) {
		t.is(
			script.getAttribute("src"),
			`https://static.cdn.prismic.io/prismic.js?repositoryName=${repositoryName}`,
		);
		t.is(script.dataset.type, "legacy");
	} else {
		t.fail("The toolbar script element was not found");
	}
});
