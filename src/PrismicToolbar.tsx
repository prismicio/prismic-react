"use client";

import { useEffect } from "react";
import { getToolbarSrc } from "@prismicio/client";

/** Props for `<PrismicToolbar>`. */
export type PrismicToolbarProps = {
	/**
	 * The name of the Prismic repository. For example, `"my-repo"` if the
	 * repository URL is `my-repo.prismic.io`.
	 */
	repositoryName: string;
};

/**
 * React component that injects the Prismic Toolbar into the app. This component
 * can be placed anywhere in the React tree.
 */
export function PrismicToolbar(props: PrismicToolbarProps) {
	const { repositoryName } = props;

	const src = getToolbarSrc(repositoryName);

	useEffect(() => {
		const existingScript = document.querySelector(`script[src="${src}"]`);

		if (!existingScript) {
			const script = document.createElement("script");
			script.src = src;
			script.defer = true;

			// Used to distinguish the toolbar element from other elements.
			script.dataset.prismicToolbar = "";
			script.dataset.repositoryName = repositoryName;

			// Disable Happy DOM `<script>` evaluation during tests.
			// @ts-expect-error - `_evaluateScript` is a Happy DOM-specific property.
			script._evaluateScript = false;

			document.body.appendChild(script);
		}
	}, [repositoryName, src]);

	return null;
}
