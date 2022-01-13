import { useContext } from "react";

import { PrismicContext, PrismicContextValue } from "./PrismicProvider";

/**
 * React hook used to read shared configuration for `@prismicio/react`
 * components and hooks.
 *
 * @returns The closest `<PrismicProvider>` context value.
 */
export const usePrismicContext = (): PrismicContextValue => {
	return useContext(PrismicContext) || {};
};
