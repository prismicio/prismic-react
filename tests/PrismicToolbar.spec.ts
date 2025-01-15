import { test, expect } from "./infra";

test.beforeEach(async ({ page }) => {
	await page.goto("/PrismicToolbar");
});

test("adds the Prismic toolbar", async ({ appPage }) => {
	await expect(appPage.toolbarIframe).toHaveCount(1);
});

test("includes the repository name in the script element", async ({
	appPage,
}) => {
	await expect(appPage.toolbarScript).toHaveAttribute(
		"data-repository-name",
		appPage.repository.domain,
	);
});
