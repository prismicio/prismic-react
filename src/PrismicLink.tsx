import * as React from "react";
import * as prismicH from "@prismicio/helpers";
import * as prismicT from "@prismicio/types";

import { isInternalURL } from "./lib/isInternalURL";

import { usePrismicContext } from "./PrismicProvider";

export interface LinkProps {
	href: string;
	target?: string;
	rel?: string;
}

export type PrismicLinkProps = {
	linkResolver?: prismicH.LinkResolverFunction;
	internalComponent?: string | React.ComponentType<LinkProps>;
	externalComponent?: string | React.ComponentType<LinkProps>;
	target?: string;
	rel?: string;
	children?: React.ReactNode;
} & ({ field: prismicT.LinkField } | { href: string });

const defaultInternalComponent = "a";
const defaultExternalComponent = "a";

export const PrismicLink = (props: PrismicLinkProps): JSX.Element => {
	const context = usePrismicContext();

	const linkResolver = props.linkResolver || context.linkResolver;

	const href =
		("href" in props
			? props.href
			: prismicH.asLink(props.field, linkResolver)) || "";

	const target =
		props.target ||
		("field" in props && "target" in props.field && props.field.target) ||
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

	const isInternal = isInternalURL(href);

	const Component = isInternal ? InternalComponent : ExternalComponent;

	return <Component href={href} target={target} rel={rel} />;
};
