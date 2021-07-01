import * as React from "react";
import * as prismicH from "@prismicio/helpers";
import * as prismicT from "@prismicio/types";

import { invariant } from "./lib/invariant";
import { isInternalURL } from "./lib/isInternalURL";

import { usePrismicContext } from "./PrismicProvider";

export interface LinkProps {
	href: string;
	target?: string;
	rel?: string;
}

export type PrismicLinkProps<
	LinkResolverFunction extends prismicH.LinkResolverFunction,
	InternalComponent extends string | React.ComponentType<LinkProps>,
	ExternalComponent extends string | React.ComponentType<LinkProps>,
> = {
	linkResolver?: LinkResolverFunction;
	internalComponent?: InternalComponent;
	externalComponent?: ExternalComponent;
	target?: string;
	rel?: string;
	children?: React.ReactNode;
} & (
	| {
			field: prismicT.LinkField;
			href?: never;
	  }
	| {
			field?: never;
			href: string;
	  }
);

const defaultInternalComponent = "a";
const defaultExternalComponent = "a";

export const PrismicLink = <
	LinkResolverFunction extends prismicH.LinkResolverFunction,
	InternalComponent extends string | React.ComponentType<LinkProps>,
	ExternalComponent extends string | React.ComponentType<LinkProps>,
>(
	props: PrismicLinkProps<
		LinkResolverFunction,
		InternalComponent,
		ExternalComponent
	>,
): JSX.Element => {
	const context = usePrismicContext();

	const linkResolver = props.linkResolver || context.linkResolver;
	invariant(
		linkResolver,
		'A Link Resolver is required. Provide one as a "linkResolver" prop or to a <PrismicProvider> higher in your component tree.',
	);

	const href =
		props.href ||
		(props.field && prismicH.asLink(props.field, linkResolver)) ||
		"";

	const target =
		props.target ||
		(props.field && "target" in props.field && props.field.target) ||
		undefined;

	const rel =
		props.rel || target === "_blank" ? "noopener noreferrer" : undefined;

	const InternalComponent =
		props.internalComponent ||
		context.internalLinkComponent ||
		defaultInternalComponent;

	const ExternalComponent =
		props.externalComponent ||
		context.externalLinkComponent ||
		defaultExternalComponent;

	const isInternal = isInternalURL(href);

	const Component = isInternal ? InternalComponent : ExternalComponent;

	return <Component href={href} target={target} rel={rel} />;
};
