import { test, expect } from "./infra";

test.beforeEach(async ({ page }) => {
	await page.goto("/PrismicImage");
});

test("renders an image field", async ({ page }) => {
	const image = page.getByTestId("filled");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
	);
	await expect(image).toHaveAttribute(
		"srcset",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=640 640w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=828 828w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=1200 1200w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=2048 2048w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=3840 3840w",
	);
});

test("renders a width-based srcset with given widths", async ({ page }) => {
	const image = page.getByTestId("widths");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
	);
	await expect(image).toHaveAttribute(
		"srcset",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=100 100w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=200 200w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=300 300w",
	);
});

test('renders a width-based srcset with default widths if widths is "defaults"', async ({
	page,
}) => {
	const image = page.getByTestId("default-widths");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
	);
	await expect(image).toHaveAttribute(
		"srcset",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=640 640w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=828 828w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=1200 1200w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=2048 2048w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=3840 3840w",
	);
});

test('renders a width-based srcset with the field\'s responsive views if widths is "thumbnails"', async ({
	page,
}) => {
	const image = page.getByTestId("thumbnail-widths");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
	);
	await expect(image).toHaveAttribute(
		"srcset",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=800 800w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&rect=0%2C33%2C800%2C533&h=400&width=600 600w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&rect=0%2C0%2C800%2C600&h=600&width=800 800w",
	);
});

test("renders pixel-density srcset with the given densities", async ({
	page,
}) => {
	const image = page.getByTestId("pixel-densities");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
	);
	await expect(image).toHaveAttribute(
		"srcset",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&dpr=9 9x, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&dpr=10 10x",
	);
});

test('renders pixel-density srcset with default densities if pixelDensities is "defaults"', async ({
	page,
}) => {
	const image = page.getByTestId("default-pixel-densities");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
	);
	await expect(image).toHaveAttribute(
		"srcset",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&dpr=1 1x, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&dpr=2 2x, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&dpr=3 3x",
	);
});

test("prioritizes widths prop over pixelDensities", async ({ page }) => {
	const image = page.getByTestId("prioritize-widths-over-pixel-densities");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
	);
	await expect(image).toHaveAttribute(
		"srcset",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=100 100w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=200 200w, https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&width=300 300w",
	);
});

test("renders null when passed an empty field", async ({ page }) => {
	const image = page.getByTestId("empty");
	await expect(image).toHaveCount(0);
});

test("renders fallback when passed an empty field", async ({ page }) => {
	const fallback = page.getByTestId("fallback");
	await expect(fallback).toContainText("foo");
});

test("renders the field's alt text", async ({ page }) => {
	const image = page.getByTestId("with-alt");
	await expect(image).toHaveAttribute("alt", "alt text");
});

test("excludes alt text if the field does not have any", async ({ page }) => {
	const image = page.getByTestId("without-alt");
	await expect(image).not.toHaveAttribute("alt");
});

test("renders an explicit decorative fallback alt value if given", async ({
	page,
}) => {
	const image = page.getByTestId("with-decorative-fallback-alt");
	await expect(image).toHaveAttribute("alt", "");
});

test("renders an explicit decorative alt", async ({ page }) => {
	const image = page.getByTestId("with-decorative-alt");
	await expect(image).toHaveAttribute("alt", "");
});

test("supports imgix parameters", async ({ page }) => {
	const image = page.getByTestId("imgix");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&sat=-100",
	);
});

test("supports overriding imgix parameters", async ({ page }) => {
	const image = page.getByTestId("imgix-override");
	await expect(image).toHaveAttribute(
		"src",
		"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format%2Ccompress&rect=0%2C0%2C100%2C100&w=300&h=400",
	);
});

test.describe("ref", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/PrismicImage/client");
	});

	test("forwards ref", async ({ page }) => {
		const link = page.getByTestId("ref");
		await expect(link).toContainText("tagname: IMG");
	});
});
