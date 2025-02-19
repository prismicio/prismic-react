import { test, expect } from "./infra";

test.beforeEach(async ({ page }) => {
	await page.goto("/PrismicTable");
});

test("renders filled table elements", async ({ page }) => {
	const output = page.getByTestId("filled");
	expect(await output.innerHTML()).toBe(
		"<table><thead><tr><th><p>Method</p></th><th><p>Usage</p></th></tr></thead><tbody><tr><th><p>GET</p></th><td><p>For <strong>basic retrieval</strong> of information…</p></td></tr><tr><th><p>DELETE</p></th><td><p>To <em>dest</em>roy a resource and remove…</p></td></tr></tbody></table>",
	);
});

test("renders null when passed an empty field", async ({ page }) => {
	const output = page.getByTestId("empty");
	await expect(output).toBeEmpty();
});

test("renders fallback when passed an empty field", async ({ page }) => {
	const output = page.getByTestId("fallback");
	expect(await output.innerHTML()).toBe("<div>Table</div>");
});

test("renders custom table elements", async ({ page }) => {
	const output = page.getByTestId("custom-table");
	expect(await output.innerHTML()).toBe(
		'<div class="table"><div class="head"><div class="row"><div class="header"><p>Method</p></div><div class="header"><p>Usage</p></div></div></div><div class="body"><div class="row"><div class="header"><p>GET</p></div><div class="data"><p>For <strong>basic retrieval</strong> of information…</p></div></div><div class="row"><div class="header"><p>DELETE</p></div><div class="data"><p>To <em>dest</em>roy a resource and remove…</p></div></div></div></div>',
	);
});

test("renders custom table cell content", async ({ page }) => {
	const output = page.getByTestId("custom-cell-content");
	expect(await output.innerHTML()).toBe(
		'<table class="table"><thead><tr><th><p class="paragraph">Method</p></th><th><p class="paragraph">Usage</p></th></tr></thead><tbody><tr><th><p class="paragraph">GET</p></th><td><p class="paragraph">For <span class="strong">basic retrieval</span> of information…</p></td></tr><tr><th><p class="paragraph">DELETE</p></th><td><p class="paragraph">To <span class="em">dest</span>roy a resource and remove…</p></td></tr></tbody></table>',
	);
});
