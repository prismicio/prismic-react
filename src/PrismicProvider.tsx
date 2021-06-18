import * as React from "react";
import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

export type PrismicContextValue = {
	client?: prismic.Client;
	linkResolver?: prismicH.LinkResolverFunction;
	richTextComponents?: Record<string, string | React.ComponentType>;
	internalLinkComponent?: string | React.ComponentType;
	externalLinkComponent?: string | React.ComponentType;
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

	return <PrismicContext.Provider value={value}></PrismicContext.Provider>;
};
