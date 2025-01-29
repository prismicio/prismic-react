import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import assert from "node:assert";
import { fileURLToPath } from "node:url";
import { existsSync, writeFileSync } from "node:fs";

dotenv.config({ path: ".env.test.local" });

export const STORAGE_STATE = fileURLToPath(
	new URL("./tests/infra/.storage-state.json", import.meta.url),
);
if (!existsSync(STORAGE_STATE))
	writeFileSync(STORAGE_STATE, JSON.stringify({}));

// https://playwright.dev/docs/test-configuration
export default defineConfig({
	testDir: "./tests",
	testMatch: "**/*.spec.*",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "setup",
			testMatch: "setup.ts",
			teardown: "teardown",
			use: {
				storageState: STORAGE_STATE,
			},
		},
		{
			name: "nextjs",
			dependencies: ["setup"],
			use: {
				...devices["Desktop Chrome"],
				baseURL: "http://localhost:4321",
				storageState: STORAGE_STATE,
			},
		},
		{
			name: "teardown",
			testMatch: "teardown.ts",
			use: {
				storageState: STORAGE_STATE,
			},
		},
	],
	webServer: [
		{
			command: "npm run --workspace nextjs dev",
			port: 4321,
			reuseExistingServer: !process.env.CI,
		},
	],
});

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv {
			CI: boolean;
			PLAYWRIGHT_PRISMIC_EMAIL: string;
			PLAYWRIGHT_PRISMIC_PASSWORD: string;
		}
	}
}

assert.ok(
	process.env.PLAYWRIGHT_PRISMIC_EMAIL,
	"Missing PLAYWRIGHT_PRISMIC_EMAIL env variable.",
);
assert.ok(
	process.env.PLAYWRIGHT_PRISMIC_PASSWORD,
	"Missing PLAYWRIGHT_PRISMIC_PASSWORD env variable.",
);
