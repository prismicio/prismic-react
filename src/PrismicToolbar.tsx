"use client";

import { getToolbarSrc } from "@prismicio/client";
import { type FC, useEffect, useRef } from "react";

/** Props for `<PrismicToolbar>`. */
export type PrismicToolbarProps = {
	/**
	 * The name of the Prismic repository. For example, `"my-repo"` if the repository URL is
	 * `my-repo.prismic.io`.
	 */
	repositoryName: string;

	/**
	 * Called when the Prismic toolbar triggers a preview update. This happens when the previewed
	 * content changes.
	 *
	 * The new ref can be read from `event.detail.ref`.
	 *
	 * The default page reload behavior can be cancelled with `event.preventDefault()`.
	 */
	onPreviewUpdate?: (event: CustomEvent<{ ref: string }>) => void;

	/**
	 * Called when the Prismic toolbar triggers a preview end. This happens when a preview session is
	 * closed.
	 *
	 * The default page reload behavior can be cancelled with `event.preventDefault()`.
	 */
	onPreviewEnd?: (event: CustomEvent<null>) => void;
};

/**
 * Renders the Prismic Toolbar script to support draft previews.
 *
 * @example
 * 	```tsx
 * 	<PrismicToolbar repositoryName="my-repo" />;
 * 	```
 *
 * @see Learn how to set up preview functionality and the toolbar's role in preview sessions: {@link https://prismic.io/docs/previews}
 */
export const PrismicToolbar: FC<PrismicToolbarProps> = (props) => {
	const { repositoryName, onPreviewUpdate, onPreviewEnd } = props;

	const src = getToolbarSrc(repositoryName);

	const onPreviewUpdateRef = useRef(onPreviewUpdate);
	onPreviewUpdateRef.current = onPreviewUpdate;

	const onPreviewEndRef = useRef(onPreviewEnd);
	onPreviewEndRef.current = onPreviewEnd;

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

	useEffect(() => {
		const controller = new AbortController();

		window.addEventListener(
			"prismicPreviewUpdate",
			(event) => onPreviewUpdateRef.current?.(event as CustomEvent<{ ref: string }>),
			{ signal: controller.signal },
		);

		window.addEventListener(
			"prismicPreviewEnd",
			(event) => onPreviewEndRef.current?.(event as CustomEvent<null>),
			{ signal: controller.signal },
		);

		return () => controller.abort();
	}, []);

	return null;
};
