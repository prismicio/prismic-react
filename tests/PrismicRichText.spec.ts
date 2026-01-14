import { test, expect } from "./infra";

test.beforeEach(async ({ page }) => {
	await page.goto("/PrismicRichText");
});

test("renders elements from rich text", async ({ page }) => {
	const output = page.getByTestId("filled");
	expect(await output.innerHTML()).toBe("<p>foo</p><p>bar</p>");
});

test("renders null when passed an empty field", async ({ page }) => {
	const output = page.getByTestId("empty");
	await expect(output).toBeEmpty();
});

test("renders fallback when passed an empty field", async ({ page }) => {
	const output = page.getByTestId("fallback");
	await expect(output).toContainText("foo");
});

test.describe("heading1", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("heading1");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<h1>foo</h1>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("heading1");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe('<div data-bar="true">foo</div>');
	});
});

test.describe("heading2", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("heading2");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<h2>foo</h2>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("heading2");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe('<div data-bar="true">foo</div>');
	});
});

test.describe("heading3", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("heading3");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<h3>foo</h3>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("heading3");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe('<div data-bar="true">foo</div>');
	});
});

test.describe("heading4", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("heading4");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<h4>foo</h4>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("heading4");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe('<div data-bar="true">foo</div>');
	});
});

test.describe("heading5", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("heading5");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<h5>foo</h5>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("heading5");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe('<div data-bar="true">foo</div>');
	});
});

test.describe("heading6", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("heading6");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<h6>foo</h6>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("heading6");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe('<div data-bar="true">foo</div>');
	});
});

test.describe("paragraph", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("paragraph");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<p>foo</p>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("paragraph");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe('<div data-bar="true">foo</div>');
	});
});

test.describe("preformatted", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("preformatted");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<pre>foo</pre>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("preformatted");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe('<div data-bar="true">foo</div>');
	});
});

test.describe("strong", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("strong");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<p><strong>foo</strong></p>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("strong");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe(
			'<p><span data-bar="true">foo</span></p>',
		);
	});
});

test.describe("em", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("em");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<p><em>foo</em></p>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("em");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe(
			'<p><span data-bar="true">foo</span></p>',
		);
	});
});

test.describe("list", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("list");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<ul><li>foo</li><li>bar</li></ul>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("list");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe(
			'<div data-bar="true"><div data-baz="true">foo</div><div data-baz="true">bar</div></div>',
		);
	});
});

test.describe("ordered list", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("ordered-list");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe("<ol><li>foo</li><li>bar</li></ol>");
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("ordered-list");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe(
			'<div data-bar="true"><div data-baz="true">foo</div><div data-baz="true">bar</div></div>',
		);
	});
});

test.describe("image", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("image");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe(
			'<p class="block-img"><img src="https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress" alt="alt text"></p>',
		);
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("image");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe(
			'<div data-bar="true" data-src="https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress"></div>',
		);
	});
});

test.describe("embed", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("embed");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe(
			'<div data-oembed="https://example.com" data-oembed-type="link"><div>html</div></div>',
		);
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("embed");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe(
			'<div data-bar="true" data-html="&lt;div&gt;html&lt;/div&gt;"></div>',
		);
	});
});

test.describe("hyperlink", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("hyperlink");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe(
			'<p><a target="_self" href="https://example.com" rel="noreferrer">foo</a></p>',
		);
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("hyperlink");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe(
			'<p><span data-bar="true" data-url="https://example.com">foo</span></p>',
		);
	});

	test("renders internalComponent when link is internal", async ({ page }) => {
		const scope = page.getByTestId("hyperlink");
		const output = scope.getByTestId("custom-internal");
		const component = output.getByTestId("internal");
		await expect(component).toHaveCount(1);
	});

	test("renders externalComponent when link is external", async ({ page }) => {
		const scope = page.getByTestId("hyperlink");
		const output = scope.getByTestId("custom-external");
		const component = output.getByTestId("external");
		await expect(component).toHaveCount(1);
	});
});

test.describe("label", () => {
	test("default", async ({ page }) => {
		const scope = page.getByTestId("label");
		const output = scope.getByTestId("default");
		expect(await output.innerHTML()).toBe(
			'<p><span class="bar">foo</span></p>',
		);
	});

	test("custom", async ({ page }) => {
		const scope = page.getByTestId("label");
		const output = scope.getByTestId("custom");
		expect(await output.innerHTML()).toBe(
			'<p><span data-bar="true" data-label="bar">foo</span></p>',
		);
	});
});
