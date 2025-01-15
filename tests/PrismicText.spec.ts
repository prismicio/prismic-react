import { test, expect } from "./infra";

test.beforeEach(async ({ page }) => {
	await page.goto("/PrismicText");
});

test("renders text from rich text", async ({ page }) => {
	const text = page.getByTestId("filled");
	await expect(text).toContainText("foo bar");
});

test("renders null when passed an empty field", async ({ page }) => {
	const text = page.getByTestId("empty");
	await expect(text).toBeEmpty();
});

test("renders fallback when passed an empty field", async ({ page }) => {
	const text = page.getByTestId("fallback");
	await expect(text).toContainText("foo");
});

test("renders null when passed a string field", async ({ page }) => {
	const keytext = page.getByTestId("keytext");
	await expect(keytext).toBeEmpty();
	const select = page.getByTestId("select");
	await expect(select).toBeEmpty();
});

test("supports custom separator", async ({ page }) => {
	const text = page.getByTestId("custom-separator");
	await expect(text).toContainText("fooxbar");
});
