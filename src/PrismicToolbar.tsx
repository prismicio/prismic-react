"use client";

import { FC, useEffect } from "react";
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
 * Renders the Prismic Toolbar script to support draft previews.
 *
 * @example
 *
 * ```tsx
 * <PrismicToolbar repositoryName="my-repo" />;
 * ```
 *
 * @see Learn how to set up preview functionality and the toolbar's role in preview sessions: {@link https://prismic.io/docs/previews}
 */
export const PrismicToolbar: FC<PrismicToolbarProps> = (props) => {
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
};
