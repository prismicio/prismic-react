"use client";

import * as React from "react";
import { getToolbarSrc } from "@prismicio/client";

/**
 * Props for `<PrismicToolbar>`.
 */
export type PrismicToolbarProps = {
	/**
	 * The name of the Prismic repository. For example, `"my-repo"` if the
	 * repository URL is `my-repo.prismic.io`.
	 */
	repositoryName: string;

	/**
	 * The type of toolbar needed for the repository. Defaults to `"new"`.
	 *
	 * @deprecated All repositories use the "new"-type toolbar. This option can be
	 *   removed.
	 * @see To check which version you need, view the Prismic Toolbar documentation {@link https://prismic.io/docs/technologies/previews-and-the-prismic-toolbar-reactjs}
	 */
	type?: "new" | "legacy";
};

/**
 * React component that injects the Prismic Toolbar into the app. This component
 * can be placed anywhere in the React tree.
 */
export const PrismicToolbar = ({
	repositoryName,
}: PrismicToolbarProps): null => {
	const src = getToolbarSrc(repositoryName);

	React.useEffect(() => {
		const existingScript = document.querySelector(`script[src="${src}"]`);

		if (!existingScript) {
			const script = document.createElement("script");
			script.src = src;
			script.defer = true;

			// Used to distinguish the toolbar element from other elements.
			script.dataset.prismicToolbar = "";
			script.dataset.repositoryName = repositoryName;

			// Disable Happy DOM `<script>` evaluation during
			// tests.
			//
			// This is a patch ONLY INCLUDED DURING TESTS. It will
			// be pruned during code minification in non-test
			// environments.
			//
			// @see https://github.com/capricorn86/happy-dom/blob/02ae081e36f990c06171eda44f9d885fd9413d73/packages/happy-dom/src/nodes/html-script-element/HTMLScriptElement.ts#L191-L209
			if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
				// @ts-expect-error - `_evaluateScript` is a Happy DOM-specific property.
				script._evaluateScript = false;
			}

			document.body.appendChild(script);
		}
	}, [repositoryName, src]);

	return null;
};
