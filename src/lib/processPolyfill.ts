// Polyfill `process` in environments like the browser.
if (typeof process === "undefined") {
	globalThis.process = { env: {} } as typeof process;
}
