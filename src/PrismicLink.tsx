"use client";

import * as React from "react";

import {
	PrismicLink as ServerPrismicLink,
	LinkProps,
	PrismicLinkProps,
	defaultComponent,
} from "./react-server/PrismicLink";

import { usePrismicContext } from "./usePrismicContext";

export type { LinkProps, PrismicLinkProps };

export const PrismicLink = React.forwardRef(function PrismicLink<
	InternalComponentProps = React.ComponentProps<typeof defaultComponent>,
	ExternalComponentProps = React.ComponentProps<typeof defaultComponent>,
>(
	props: PrismicLinkProps<InternalComponentProps, ExternalComponentProps>,
	ref: React.ForwardedRef<Element>,
) {
	const context = usePrismicContext();

	return (
		<ServerPrismicLink
			ref={ref}
			linkResolver={context.linkResolver}
			internalComponent={context.internalLinkComponent}
			externalComponent={context.externalLinkComponent}
			{...props}
		/>
	);
}) as <
	InternalComponentProps = React.ComponentProps<typeof defaultComponent>,
	ExternalComponentProps = React.ComponentProps<typeof defaultComponent>,
>(
	props: PrismicLinkProps<InternalComponentProps, ExternalComponentProps> & {
		ref?: React.ForwardedRef<Element>;
	},
) => JSX.Element;
