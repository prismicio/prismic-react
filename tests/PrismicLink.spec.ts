import { test, expect } from "./infra";

test.beforeEach(async ({ page }) => {
	await page.goto("/PrismicLink");
});

test.describe("web links", () => {
	test("renders an internal web link", async ({ page }) => {
		const link = page.getByTestId("internal-web");
		await expect(link).toHaveAttribute("href", "/foo");
		await expect(link).not.toHaveAttribute("rel");
		await expect(link).not.toHaveAttribute("target");
	});

	test("renders an external web link", async ({ page }) => {
		const link = page.getByTestId("external-web");
		await expect(link).toHaveAttribute("href", "https://example.com");
		await expect(link).toHaveAttribute("rel", "noreferrer");
		await expect(link).not.toHaveAttribute("target");
	});

	test("renders an external web link with _blank target", async ({ page }) => {
		const link = page.getByTestId("external-web-with-target");
		await expect(link).toHaveAttribute("target", "_blank");
	});

	test("renders an external web link with a provided target", async ({
		page,
	}) => {
		const link = page.getByTestId("external-web-with-target-override");
		await expect(link).toHaveAttribute("target", "foo");
	});

	test("renders an external web link with a provided rel", async ({ page }) => {
		const link = page.getByTestId("external-web-with-rel-prop");
		await expect(link).toHaveAttribute("rel", "foo");
	});

	test("can render an external web link without a rel", async ({ page }) => {
		const link = page.getByTestId("external-web-with-removed-rel");
		await expect(link).not.toHaveAttribute("rel");
	});

	test("can render an external web link with rel derived from a function", async ({
		page,
	}) => {
		const link = page.getByTestId("external-web-with-rel-function");
		await expect(link).toHaveAttribute(
			"rel",
			JSON.stringify({
				href: "https://example.com",
				isExternal: true,
				target: undefined,
			}),
		);
	});
});

test.describe("document links", () => {
	test("renders a document link with a route resolver", async ({ page }) => {
		const link = page.getByTestId("document-link-with-route-resolver");
		await expect(link).toHaveAttribute("href", "/page");
		await expect(link).not.toHaveAttribute("rel");
		await expect(link).not.toHaveAttribute("target");
	});

	test("renders a document link with a link resolver", async ({ page }) => {
		const link = page.getByTestId("document-link-with-link-resolver");
		await expect(link).toHaveAttribute("href", "/page");
		await expect(link).not.toHaveAttribute("rel");
		await expect(link).not.toHaveAttribute("target");
	});
});

test.describe("media links", () => {
	test("renders a media link", async ({ page }) => {
		const link = page.getByTestId("media-link");
		await expect(link).toHaveAttribute(
			"href",
			"https://images.prismic.io/prismicio-next-test/Z1eqf5bqstJ98PjU_ryoji-iwata-n31JPLu8_Pw-unsplash.jpg?auto=format,compress?auto=compress,format",
		);
		await expect(link).toHaveAttribute("rel", "noreferrer");
		await expect(link).not.toHaveAttribute("target");
	});
});

test.describe("documents", () => {
	test("renders a document link with a route resolver via the document prop", async ({
		page,
	}) => {
		const link = page.getByTestId("document-prop-with-route-resolver");
		await expect(link).toHaveAttribute("href", "/page");
		await expect(link).not.toHaveAttribute("rel");
		await expect(link).not.toHaveAttribute("target");
	});

	test("renders a document link with a link resolver via the document prop", async ({
		page,
	}) => {
		const link = page.getByTestId("document-prop-with-link-resolver");
		await expect(link).toHaveAttribute("href", "/page");
		await expect(link).not.toHaveAttribute("rel");
		await expect(link).not.toHaveAttribute("target");
	});
});

test.describe("href", () => {
	test("renders an external href", async ({ page }) => {
		const link = page.getByTestId("external-href-prop");
		await expect(link).toHaveAttribute("href", "https://example.com");
		// TODO: We should be setting `rel="noreferrer"` with an external `href`.
		await expect(link).not.toHaveAttribute("rel");
		await expect(link).not.toHaveAttribute("target");
	});

	test("renders an internal href", async ({ page }) => {
		const link = page.getByTestId("internal-href-prop");
		await expect(link).toHaveAttribute("href", "/foo");
		await expect(link).not.toHaveAttribute("rel");
		await expect(link).not.toHaveAttribute("target");
	});

	test("renders default next/link href on falsy href", async ({ page }) => {
		const link = page.getByTestId("falsy-href-prop");
		const defaultHref = await page
			.getByTestId("default-link-falsy-href")
			.getAttribute("href");
		expect(await link.getAttribute("href")).toEqual(defaultHref);
		await expect(link).not.toHaveAttribute("rel");
		await expect(link).not.toHaveAttribute("target");
	});
});

test.describe("with text", () => {
	test("renders a link's text as children", async ({ page }) => {
		const link = page.getByTestId("with-text");
		await expect(link).toContainText("foo");
	});

	test("renders the given children, overriding the link's text", async ({
		page,
	}) => {
		const link = page.getByTestId("with-text-override");
		await expect(link).toContainText("override");
	});
});

test.describe("ref", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/PrismicLink/client");
	});

	test("forwards ref", async ({ page }) => {
		const link = page.getByTestId("ref");
		await expect(link).toContainText("tagname: A");
	});
});

test.describe("global config", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/PrismicLink/global-config");
	});

	test("uses global internalLinkComponent for internal links", async ({
		page,
	}) => {
		const scope = page.getByTestId("uses-global");
		const link = scope.getByTestId("global-internal-link");
		await expect(link).toHaveCount(1);
	});

	test("prop-level internalComponent overrides global config", async ({
		page,
	}) => {
		const scope = page.getByTestId("override");
		const link = scope.getByTestId("override-internal-link");
		await expect(link).toHaveCount(1);
		await expect(scope.getByTestId("global-internal-link")).toHaveCount(0);
	});

	test("external links are not affected by global internalLinkComponent", async ({
		page,
	}) => {
		const scope = page.getByTestId("external-unaffected");
		await expect(scope.getByTestId("global-internal-link")).toHaveCount(0);
	});
});
