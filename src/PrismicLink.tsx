import * as React from "react";
import * as prismicH from "@prismicio/helpers";
import * as prismicT from "@prismicio/types";

import { isInternalURL } from "./lib/isInternalURL";

import { usePrismicContext } from "./usePrismicContext";

/**
 * Props provided to a component when rendered with `<PrismicLink>`.
 */
export interface LinkProps {
	/**
	 * The URL to link.
	 */
	href: string;

	/**
	 * The `target` attribute for anchor elements. If the Prismic field is
	 * configured to open in a new window, this prop defaults to `_blank`.
	 */
	target?: string;

	/**
	 * The `rel` attribute for anchor elements. If the `target` prop is set to
	 * `"_blank"`, this prop defaults to `"noopener noreferrer"`.
	 */
	rel?: string;

	/**
	 * Children for the component. *
	 */
	children?: React.ReactNode;
}

type ComponentProps<T> = T extends React.ComponentType<infer U>
	? U
	: T extends keyof JSX.IntrinsicElements
	? React.ComponentProps<T>
	: unknown;

/**
 * Props for `<PrismicLink>`.
 */
export type PrismicLinkProps<
	InternalComponent extends string | React.ComponentType<LinkProps> =
		| string
		| React.ComponentType<LinkProps>,
	ExternalComponent extends string | React.ComponentType<LinkProps> =
		| string
		| React.ComponentType<LinkProps>,
> = ComponentProps<InternalComponent> & {
	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks
	 * If your app uses Route Resolvers when querying for your Prismic
	 * repository's content, a Link Resolver does not need to be provided.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	linkResolver?: prismicH.LinkResolverFunction;

	/**
	 * The component rendered for internal URLs. Defaults to `<a>`.
	 *
	 * If your app uses a client-side router that requires a special Link
	 * component, provide the Link component to this prop.
	 */
	internalComponent?: InternalComponent;

	/**
	 * The component rendered for external URLs. Defaults to `<a>`.
	 */
	externalComponent?: ExternalComponent;

	/**
	 * The `target` attribute for anchor elements. If the Prismic field is
	 * configured to open in a new window, this prop defaults to `_blank`.
	 */
	target?: string;

	/**
	 * The `rel` attribute for anchor elements. If the `target` prop is set to
	 * `"_blank"`, this prop defaults to `"noopener noreferrer"`.
	 */
	rel?: string;

	/**
	 * Children for the component. *
	 */
	children?: React.ReactNode;
} & (
		| {
				/**
				 * The Prismic Link field containing the URL or document to link.
				 *
				 * @see Learn about Prismic Link fields {@link https://prismic.io/docs/core-concepts/link-content-relationship}
				 */
				field?: prismicT.LinkField;
		  }
		| {
				/**
				 * The Prismic document to link.
				 */
				document?: prismicT.PrismicDocument;
		  }
		| {
				/**
				 * The URL to link.
				 */
				href?: string;
		  }
	);

/**
 * The default component rendered for internal URLs.
 */
const defaultInternalComponent = "a";

/**
 * The default component rendered for external URLs.
 */
const defaultExternalComponent = "a";

/**
 * React component to render a link from a Prismic Link field.
 *
 * Different components can be rendered depending on whether the link is
 * internal or external. This is helpful when integrating with client-side
 * routers, such as a router-specific Link component.
 *
 * If a link is configured to open in a new window using `target="_blank"`,
 * `rel="noopener noreferrer"` is set by default.
 *
 * @param props - Props for the component.
 *
 * @returns The internal or external link component depending on whether the
 *   link is internal or external.
 */
export const PrismicLink = <
	InternalComponent extends
		| string
		| React.ComponentType<LinkProps> = typeof defaultInternalComponent,
	ExternalComponent extends
		| string
		| React.ComponentType<LinkProps> = typeof defaultExternalComponent,
>(
	props: PrismicLinkProps<InternalComponent, ExternalComponent>,
): JSX.Element | null => {
	const context = usePrismicContext();

	const linkResolver = props.linkResolver || context.linkResolver;

	let href: string | null = null;
	if ("href" in props) {
		href = props.href || null;
	} else if ("document" in props && props.document) {
		href = prismicH.asLink(props.document, linkResolver);
	} else if ("field" in props && props.field) {
		href = prismicH.asLink(props.field, linkResolver);
	}

	const target =
		props.target ||
		("field" in props &&
			props.field &&
			"target" in props.field &&
			props.field.target) ||
		undefined;

	const rel =
		props.rel || (target === "_blank" ? "noopener noreferrer" : undefined);

	const InternalComponent =
		props.internalComponent ||
		context.internalLinkComponent ||
		defaultInternalComponent;

	const ExternalComponent =
		props.externalComponent ||
		context.externalLinkComponent ||
		defaultExternalComponent;

	const isInternal = href && isInternalURL(href);

	const Component = isInternal ? InternalComponent : ExternalComponent;

	return href ? (
		<Component {...props} href={href} target={target} rel={rel}>
			{props.children}
		</Component>
	) : null;
};
