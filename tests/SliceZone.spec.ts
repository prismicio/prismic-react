import { test, expect } from "./infra";

test.beforeEach(async ({ page }) => {
	await page.goto("/SliceZone");
});

test("renders components for each Slice", async ({ page }) => {
	const output = page.getByTestId("filled");
	const text = output.getByTestId("text");
	expect(await text.innerHTML()).toBe(
		'{"slice":{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]},"id":"text$877e9385-8cbd-4af2-bd65-f31d3a2588cf","slice_type":"text","slice_label":null},"index":0,"slices":[{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]},"id":"text$877e9385-8cbd-4af2-bd65-f31d3a2588cf","slice_type":"text","slice_label":null},{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress","id":"Z4b5OJbqstJ99d38","edit":{"x":0,"y":0,"zoom":1,"background":"transparent"}}},"id":"image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1","slice_type":"image","slice_label":null}],"context":{}}',
	);
	const image = output.getByTestId("image");
	expect(await image.innerHTML()).toBe(
		'{"slice":{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress","id":"Z4b5OJbqstJ99d38","edit":{"x":0,"y":0,"zoom":1,"background":"transparent"}}},"id":"image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1","slice_type":"image","slice_label":null},"index":1,"slices":[{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]},"id":"text$877e9385-8cbd-4af2-bd65-f31d3a2588cf","slice_type":"text","slice_label":null},{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress","id":"Z4b5OJbqstJ99d38","edit":{"x":0,"y":0,"zoom":1,"background":"transparent"}}},"id":"image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1","slice_type":"image","slice_label":null}],"context":{}}',
	);
});

test("renders null by when passed an empty slice zone", async ({ page }) => {
	const output = page.getByTestId("empty");
	await expect(output).toBeEmpty();
});

test("renders TODO component if component mapping is missing", async ({
	page,
}) => {
	const output = page.getByTestId("todo");
	const todo = output.locator("[data-slice-zone-todo-component]");
	await expect(todo).toHaveAttribute("data-slice-type", "image");
});

test("supports the GraphQL API", async ({ page }) => {
	const output = page.getByTestId("graphql");
	const text = output.getByTestId("text");
	expect(await text.innerHTML()).toBe(
		'{"slice":{"type":"text","variation":{"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]}}},"index":0,"slices":[{"type":"text","variation":{"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]}}},{"type":"image","variation":{"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress"}}}}],"context":{}}',
	);
	const image = output.getByTestId("image");
	expect(await image.innerHTML()).toBe(
		'{"slice":{"type":"image","variation":{"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress"}}}},"index":1,"slices":[{"type":"text","variation":{"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]}}},{"type":"image","variation":{"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress"}}}}],"context":{}}',
	);
});

test("supports mapped slices from mapSliceZone()", async ({ page }) => {
	const output = page.getByTestId("mapped");
	const text = output.getByTestId("text");
	expect(await text.innerHTML()).toBe(
		'{"id":"text$877e9385-8cbd-4af2-bd65-f31d3a2588cf","slice_type":"text","foo":"bar"}',
	);
	const image = output.getByTestId("image");
	expect(await image.innerHTML()).toBe(
		'{"id":"image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1","slice_type":"image","bar":"baz"}',
	);
});
