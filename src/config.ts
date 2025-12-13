import { ComponentType } from "react";

import type { LinkProps } from "./PrismicLink.js";

const globalConfigKey = Symbol.for("@prismicio/react/config");

type GlobalThis = {
	[globalConfigKey]?: GlobalPrismicReactConfig;
};

type GlobalPrismicReactConfig = {
	internalLinkComponent?: ComponentType<LinkProps>;
};

export function getGlobalConfig(): GlobalPrismicReactConfig {
	return (globalThis as GlobalThis)[globalConfigKey] ?? {};
}
