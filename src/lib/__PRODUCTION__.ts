// We need to polyfill process if it doesn't exist, such as in the browser.
if (typeof process === "undefined") {
	globalThis.process = { env: {} } as typeof process;
}

/**
 * `true` if in the production environment, `false` otherwise.
 *
 * This boolean can be used to perform actions only in development environments,
 * such as logging.
 */
export const __PRODUCTION__ = process.env.NODE_ENV === "production";
