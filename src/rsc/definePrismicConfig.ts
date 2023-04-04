import { __PRODUCTION__ } from "../lib/__PRODUCTION__";

import { PrismicConfig } from "./types";

class InvalidUserConfig extends Error {
	constructor(...params: ConstructorParameters<typeof Error>) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params);

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, InvalidUserConfig);
		}

		this.name = "InvalidUserConfig";
	}
}

export const definePrismicConfig = (config: PrismicConfig): PrismicConfig => {
	if (!__PRODUCTION__) {
		if ("linkResolver" in config && typeof config.linkResolver !== "function") {
			throw new InvalidUserConfig();
		}

		if ("richTextComponents" in config) {
			if (
				typeof config.richTextComponents !== "object" ||
				(typeof config.richTextComponents === "object" &&
					config.richTextComponents !== null &&
					!Object.values(config.richTextComponents).every(
						(richTextComponent) => {
							return typeof richTextComponent === "function";
						},
					))
			) {
				throw new InvalidUserConfig();
			}
		}

		if (
			"internalLinkComponent" in config &&
			typeof config.internalLinkComponent !== "function"
		) {
			throw new InvalidUserConfig();
		}

		if (
			"externalLinkComponent" in config &&
			typeof config.externalLinkComponent !== "function"
		) {
			throw new InvalidUserConfig();
		}
	}

	return config;
};
