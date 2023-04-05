/**
 * Returns the URL for a Prismic repository's Prismic Toolbar script. Use the
 * URL to inject the script into your app.
 *
 * @example
 *
 * ```typescriptreact
 * // In Next.js apps, use `next/script` in your `app/layout.tsx` file.
 *
 * import Script from "next/script";
 *
 * export default function RootLayout({
 * 	children,
 * }: {
 * 	children: React.ReactNode,
 * }) {
 * 	const prismicToolbarSrc = getPrismicToolbarSrc("my-repo");
 *
 * 	return (
 * 		<html lang="en">
 * 			<body>{children}</body>
 * 			<Script src={prismicToolbarSrc} />
 * 		</html>
 * 	);
 * }
 * ```
 *
 * @param repositoryName - The name of the Prismic repository. For example,
 *   `"my-repo"` if the repository URL is `my-repo.prismic.io`.
 *
 * @returns The URL for the given Prismic repository's Prismic Toolbar script.
 */
export const getPrismicToolbarSrc = <TRepositoryName extends string>(
	repositoryName: TRepositoryName,
): `https://static.cdn.prismic.io/prismic.js?new=true&repo=${TRepositoryName}` => {
	return `https://static.cdn.prismic.io/prismic.js?new=true&repo=${repositoryName}` as const;
};
