import { test, expect } from "./infra";

test.beforeEach(async ({ page }) => {
	await page.goto("/PrismicToolbar");
});

test("adds the Prismic toolbar", async ({ appPage }) => {
	await expect(appPage.toolbarIframe).toHaveCount(1);
});

test("includes the repository name in the script element", async ({ appPage }) => {
	await expect(appPage.toolbarScript).toHaveAttribute(
		"data-repository-name",
		appPage.repository.domain,
	);
});

test("calls onPreviewUpdate when prismicPreviewUpdate is dispatched", async ({ page }) => {
	await page.goto("/PrismicToolbar/preview-events");

	const updateCount = page.getByTestId("update-count");
	const updateRef = page.getByTestId("update-ref");
	await expect(updateCount).toHaveText("0");

	await page.evaluate(() => {
		window.dispatchEvent(
			new CustomEvent("prismicPreviewUpdate", {
				detail: { ref: "test-ref-1" },
			}),
		);
	});
	await expect(updateCount).toHaveText("1");
	await expect(updateRef).toHaveText("test-ref-1");

	await page.evaluate(() => {
		window.dispatchEvent(
			new CustomEvent("prismicPreviewUpdate", {
				detail: { ref: "test-ref-2" },
			}),
		);
	});
	await expect(updateCount).toHaveText("2");
	await expect(updateRef).toHaveText("test-ref-2");
});

test("calls onPreviewEnd when prismicPreviewEnd is dispatched", async ({ page }) => {
	await page.goto("/PrismicToolbar/preview-events");

	const endCount = page.getByTestId("end-count");
	await expect(endCount).toHaveText("0");

	await page.evaluate(() => {
		window.dispatchEvent(new CustomEvent("prismicPreviewEnd", { detail: null }));
	});
	await expect(endCount).toHaveText("1");

	await page.evaluate(() => {
		window.dispatchEvent(new CustomEvent("prismicPreviewEnd", { detail: null }));
	});
	await expect(endCount).toHaveText("2");
});
