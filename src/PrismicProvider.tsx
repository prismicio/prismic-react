import * as React from "react";
import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

import { LinkProps } from "./PrismicLink";

export type PrismicContextValue = {
	client?: prismic.Client;
	linkResolver?: prismicH.LinkResolverFunction;
	richTextComponents?: Record<string, string | React.ComponentType>;
	internalLinkComponent?: string | React.ComponentType<LinkProps>;
	externalLinkComponent?: string | React.ComponentType<LinkProps>;
	children?: React.ReactNode;
};

export const PrismicContext = React.createContext<PrismicContextValue>({});

export const usePrismicContext = (): PrismicContextValue => {
	return React.useContext(PrismicContext) || {};
};

type PrismicProviderProps = PrismicContextValue;

export const PrismicProvider = ({
	client,
	linkResolver,
	richTextComponents,
	internalLinkComponent,
	externalLinkComponent,
	children,
}: PrismicProviderProps): JSX.Element => {
	const value = React.useMemo<PrismicContextValue>(
		() => ({
			client,
			linkResolver,
			richTextComponents,
			internalLinkComponent,
			externalLinkComponent,
		}),
		[
			client,
			linkResolver,
			richTextComponents,
			internalLinkComponent,
			externalLinkComponent,
		],
	);

	return (
		<PrismicContext.Provider value={value}>{children}</PrismicContext.Provider>
	);
};
