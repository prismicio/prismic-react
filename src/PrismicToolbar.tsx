import * as React from "react";

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
	type = "new",
}: PrismicToolbarProps): null => {
	const src = `https://static.cdn.prismic.io/prismic.js?repo=${repositoryName}${
		type === "new" ? "&new=true" : ""
	}`;

	React.useEffect(() => {
		const existingScript = document.querySelector(`script[src="${src}"]`);

		if (!existingScript) {
			const script = document.createElement("script");
			script.src = src;
			script.defer = true;

			// Used to distinguish the toolbar element from other elements.
			script.dataset.prismicToolbar = "";
			script.dataset.repositoryName = repositoryName;
			script.dataset.type = type;

			document.body.appendChild(script);
		}
	}, [repositoryName, type, src]);

	return null;
};
