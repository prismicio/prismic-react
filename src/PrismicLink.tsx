import {
	ComponentProps,
	ComponentType,
	ElementType,
	ForwardedRef,
	HTMLAttributeAnchorTarget,
	ReactNode,
	forwardRef,
} from "react";
import {
	type LinkField,
	type LinkResolverFunction,
	type PrismicDocument,
	asLinkAttrs,
	type AsLinkAttrsConfig,
} from "@prismicio/client";
import { DEV } from "esm-env";

import { devMsg } from "./lib/devMsg.js";

/** The default component rendered for internal and external links. */
const defaultComponent = "a";

/** Props provided to a component when rendered with `<PrismicLink>`. */
export interface LinkProps {
	/** The URL to link. */
	href: string;

	/**
	 * The `target` attribute for anchor elements. If the Prismic field is
	 * configured to open in a new window, this prop defaults to `_blank`.
	 */
	target?: HTMLAttributeAnchorTarget;

	/**
	 * The `rel` attribute for anchor elements. If the `target` prop is set to
	 * `"_blank"`, this prop defaults to `"noopener noreferrer"`.
	 */
	rel?: string;

	/** Children for the component. * */
	children?: ReactNode;
}

export type PrismicLinkProps<
	InternalComponentProps = ComponentProps<typeof defaultComponent>,
	ExternalComponentProps = ComponentProps<typeof defaultComponent>,
> = Omit<
	InternalComponentProps & ExternalComponentProps,
	"rel" | "href" | "children"
> & {
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
	 *
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	linkResolver?: LinkResolverFunction;

	/**
	 * The component rendered for internal URLs. Defaults to `<a>`.
	 *
	 * If your app uses a client-side router that requires a special Link
	 * component, provide the Link component to this prop.
	 */
	internalComponent?: ElementType<InternalComponentProps>;

	/** The component rendered for external URLs. Defaults to `<a>`. */
	externalComponent?: ComponentType<ExternalComponentProps>;

	/**
	 * The children to render for the link. If no children are provided, the
	 * link's `text` property will be used.
	 */
	children?: ReactNode;
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

export const PrismicLink = forwardRef(function PrismicLink<
	InternalComponentProps = ComponentProps<typeof defaultComponent>,
	ExternalComponentProps = ComponentProps<typeof defaultComponent>,
>(
	props: PrismicLinkProps<InternalComponentProps, ExternalComponentProps>,
	ref: ForwardedRef<Element>,
): JSX.Element {
	const {
		field,
		document: doc,
		linkResolver,
		internalComponent,
		externalComponent,
		children,
		...restProps
	} = props;

	if (DEV) {
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
				("text" in field
					? Object.keys(field).length > 2
					: Object.keys(field).length > 1) &&
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
		defaultComponent) as ComponentType<LinkProps>;
	const ExternalComponent = (externalComponent ||
		defaultComponent) as ComponentType<LinkProps>;
	const Component = href
		? isInternalURL(href)
			? InternalComponent
			: ExternalComponent
		: InternalComponent;

	return (
		<Component ref={ref} {...attrs} {...restProps} href={href} rel={rel}>
			{"children" in props ? children : field?.text}
		</Component>
	);
}) as <
	InternalComponentProps = ComponentProps<typeof defaultComponent>,
	ExternalComponentProps = ComponentProps<typeof defaultComponent>,
>(
	props: PrismicLinkProps<InternalComponentProps, ExternalComponentProps> & {
		ref?: ForwardedRef<Element>;
	},
) => JSX.Element;

/**
 * Determines if a URL is internal or external.
 *
 * @param url - The URL to check if internal or external.
 *
 * @returns `true` if `url` is internal, `false` otherwise.
 */
// TODO: This does not detect all relative URLs as internal such as `about` or `./about`. This function assumes relative URLs start with a "/" or "#"`.
export function isInternalURL(url: string): boolean {
	const isInternal = /^(\/(?!\/)|#)/.test(url);
	const isSpecialLink = !isInternal && !/^https?:\/\//.test(url);

	return isInternal && !isSpecialLink;
}
