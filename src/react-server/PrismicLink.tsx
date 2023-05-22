import * as React from "react";
import {
	LinkField,
	LinkResolverFunction,
	PrismicDocument,
	asLinkAttrs,
	AsLinkAttrsConfig,
} from "@prismicio/client";

import { devMsg } from "../lib/devMsg";
import { isInternalURL } from "../lib/isInternalURL";

/**
 * The default component rendered for internal and external links.
 */
export const defaultComponent = "a";

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
	target?: React.HTMLAttributeAnchorTarget;

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

export type PrismicLinkProps<
	InternalComponentProps = React.ComponentProps<typeof defaultComponent>,
	ExternalComponentProps = React.ComponentProps<typeof defaultComponent>,
> = Omit<InternalComponentProps & ExternalComponentProps, "rel" | "href"> & {
	/**
	 * The `rel` attribute for the link. By default, `"noreferrer"` is provided if
	 * the link's URL is external. This prop can be provided a function to use the
	 * link's metadata to determine the `rel` value.
	 */
	rel?: string | AsLinkAttrsConfig["rel"];

	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks
	 * If your app uses Route Resolvers when querying for your Prismic
	 * repository's content, a Link Resolver does not need to be provided.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	linkResolver?: LinkResolverFunction;

	/**
	 * The component rendered for internal URLs. Defaults to `<a>`.
	 *
	 * If your app uses a client-side router that requires a special Link
	 * component, provide the Link component to this prop.
	 */
	internalComponent?: React.ElementType<InternalComponentProps>;

	/**
	 * The component rendered for external URLs. Defaults to `<a>`.
	 */
	externalComponent?: React.ComponentType<ExternalComponentProps>;
} & (
		| {
				document: PrismicDocument | null | undefined;
				href?: never;
				field?: never;
		  }
		| {
				field: LinkField | null | undefined;
				href?: never;
				document?: never;
		  }
		| {
				href: LinkProps["href"];
				field?: LinkField | null | undefined;
				document?: never;
		  }
	);

export const PrismicLink = React.forwardRef(function PrismicLink<
	InternalComponentProps = React.ComponentProps<typeof defaultComponent>,
	ExternalComponentProps = React.ComponentProps<typeof defaultComponent>,
>(
	{
		field,
		document: doc,
		linkResolver,
		internalComponent,
		externalComponent,
		...restProps
	}: PrismicLinkProps<InternalComponentProps, ExternalComponentProps>,
	ref: React.ForwardedRef<Element>,
): JSX.Element {
	if (
		typeof process !== "undefined" &&
		process.env.NODE_ENV === "development"
	) {
		if (field) {
			if (!field.link_type) {
				console.error(
					`[PrismicLink] This "field" prop value caused an error to be thrown.\n`,
					field,
				);
				throw new Error(
					`[PrismicLink] The provided field is missing required properties to properly render a link. The link will not render. For more details, see ${devMsg(
						"missing-link-properties",
					)}`,
				);
			} else if (
				Object.keys(field).length > 1 &&
				!("url" in field || "uid" in field || "id" in field)
			) {
				console.warn(
					`[PrismicLink] The provided field is missing required properties to properly render a link. The link may not render correctly. For more details, see ${devMsg(
						"missing-link-properties",
					)}`,
					field,
				);
			}
		} else if (doc) {
			if (!("url" in doc || "id" in doc)) {
				console.warn(
					`[PrismicLink] The provided document is missing required properties to properly render a link. The link may not render correctly. For more details, see ${devMsg(
						"missing-link-properties",
					)}`,
					doc,
				);
			}
		}
	}

	const {
		href: computedHref,
		rel: computedRel,
		...attrs
	} = asLinkAttrs(field ?? doc, {
		linkResolver,
		rel: typeof restProps.rel === "function" ? restProps.rel : undefined,
	});

	let rel: string | undefined = computedRel;
	if ("rel" in restProps && typeof restProps.rel !== "function") {
		rel = restProps.rel;
	}

	const href = ("href" in restProps ? restProps.href : computedHref) || "";

	const InternalComponent = (internalComponent ||
		defaultComponent) as React.ComponentType<LinkProps>;
	const ExternalComponent = (externalComponent ||
		defaultComponent) as React.ComponentType<LinkProps>;
	const Component =
		href && isInternalURL(href) ? InternalComponent : ExternalComponent;

	return (
		<Component ref={ref} {...attrs} {...restProps} href={href} rel={rel} />
	);
}) as <
	InternalComponentProps = React.ComponentProps<typeof defaultComponent>,
	ExternalComponentProps = React.ComponentProps<typeof defaultComponent>,
>(
	props: PrismicLinkProps<InternalComponentProps, ExternalComponentProps> & {
		ref?: React.ForwardedRef<Element>;
	},
) => JSX.Element;
