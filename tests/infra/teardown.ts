import { STORAGE_STATE } from "../../playwright.config";
import { test as teardown } from "./test";

teardown("delete repo", async ({ page, prismic }) => {
	const cookies = await page.context().cookies();
	const repoName = cookies.find((c) => c.name === "repository-name")?.value;
	if (!repoName) return;
	const repo = prismic.getRepo(repoName);
	await repo.delete();
	await page.context().clearCookies({ name: "repository-name" });
	await page.context().storageState({ path: STORAGE_STATE });
});
