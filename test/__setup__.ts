import { afterAll, beforeAll, beforeEach, vi } from "vitest";

import { MockFactory, createMockFactory } from "@prismicio/mock";
import { setupServer, SetupServer } from "msw/node";

import * as prismic from "@prismicio/client";

declare module "vitest" {
	export interface TestContext {
		mock: MockFactory;
		msw: SetupServer;
	}
}

const mswServer = setupServer();

vi.stubGlobal("AbortController", AbortController);

beforeAll(() => {
	mswServer.listen({ onUnhandledRequest: "error" });
});

beforeEach((ctx) => {
	ctx.mock = createMockFactory({ seed: ctx.meta.name });
	ctx.msw = mswServer;

	ctx.msw.resetHandlers();

	// Reset cookies.
	if (typeof document !== "undefined") {
		document.cookie = `foo=bar; ${prismic.cookie.preview}=; baz=qux`;
	}
});

afterAll(() => {
	mswServer.close();
});
