import * as React from "react";

import {
	PrismicLink as BasePrismicLink,
	LinkProps,
	LooseLinkProps,
	PrismicLinkProps,
} from "./react-server/PrismicLink";

import { usePrismicContext } from "./usePrismicContext";

export { PrismicLinkProps, LooseLinkProps };

export const PrismicLink = React.forwardRef(function PrismicLink<
	InternalComponent extends React.ElementType<LinkProps> = "a",
	ExternalComponent extends React.ElementType<LinkProps> = "a",
>(
	props: PrismicLinkProps<InternalComponent, ExternalComponent>,
	ref: React.ForwardedRef<unknown>,
) {
	const context = usePrismicContext();

	return (
		<BasePrismicLink
			ref={ref}
			linkResolver={context.linkResolver}
			internalComponent={context.internalLinkComponent}
			externalComponent={context.externalLinkComponent}
			{...props}
		/>
	);
}) as <
	InternalComponent extends React.ElementType<LinkProps> = "a",
	ExternalComponent extends React.ElementType<LinkProps> = "a",
>(
	props: PrismicLinkProps<InternalComponent, ExternalComponent> & {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ref?: React.ForwardedRef<any>;
	},
) => JSX.Element;
