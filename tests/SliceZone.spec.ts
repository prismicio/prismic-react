import type { Locator } from "@playwright/test"

import { test, expect } from "./infra"

test("renders components for each Slice", async ({ page }) => {
	await page.goto("/SliceZone")

	const output = page.getByTestId("filled")
	const text = output.getByTestId("text")
	expect(await text.innerHTML()).toBe(
		'{"slice":{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]},"id":"text$877e9385-8cbd-4af2-bd65-f31d3a2588cf","slice_type":"text","slice_label":null},"index":0,"slices":[{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]},"id":"text$877e9385-8cbd-4af2-bd65-f31d3a2588cf","slice_type":"text","slice_label":null},{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress","id":"Z4b5OJbqstJ99d38","edit":{"x":0,"y":0,"zoom":1,"background":"transparent"}}},"id":"image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1","slice_type":"image","slice_label":null}],"context":{}}',
	)
	const image = output.getByTestId("image")
	expect(await image.innerHTML()).toBe(
		'{"slice":{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress","id":"Z4b5OJbqstJ99d38","edit":{"x":0,"y":0,"zoom":1,"background":"transparent"}}},"id":"image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1","slice_type":"image","slice_label":null},"index":1,"slices":[{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]},"id":"text$877e9385-8cbd-4af2-bd65-f31d3a2588cf","slice_type":"text","slice_label":null},{"variation":"default","version":"sktwi1xtmkfgx8626","items":[],"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress","id":"Z4b5OJbqstJ99d38","edit":{"x":0,"y":0,"zoom":1,"background":"transparent"}}},"id":"image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1","slice_type":"image","slice_label":null}],"context":{}}',
	)
})

test("renders null by when passed an empty slice zone", async ({ page }) => {
	await page.goto("/SliceZone")

	const output = page.getByTestId("empty")
	await expect(output).toBeEmpty()
})

test("renders TODO component if component mapping is missing", async ({ page }) => {
	await page.goto("/SliceZone")

	const output = page.getByTestId("todo")
	const todo = output.locator("[data-slice-zone-todo-component]")
	await expect(todo).toHaveAttribute("data-slice-type", "image")
})

test("supports the GraphQL API", async ({ page }) => {
	await page.goto("/SliceZone")

	const output = page.getByTestId("graphql")
	const text = output.getByTestId("text")
	expect(await text.innerHTML()).toBe(
		'{"slice":{"type":"text","variation":{"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]}}},"index":0,"slices":[{"type":"text","variation":{"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]}}},{"type":"image","variation":{"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress"}}}}],"context":{}}',
	)
	const image = output.getByTestId("image")
	expect(await image.innerHTML()).toBe(
		'{"slice":{"type":"image","variation":{"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress"}}}},"index":1,"slices":[{"type":"text","variation":{"primary":{"content":[{"type":"paragraph","text":"foo","spans":[],"direction":"ltr"}]}}},{"type":"image","variation":{"primary":{"content":{"dimensions":{"width":800,"height":600},"alt":null,"copyright":null,"url":"https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress"}}}}],"context":{}}',
	)
})

test("supports mapped slices from mapSliceZone()", async ({ page }) => {
	await page.goto("/SliceZone")

	const output = page.getByTestId("mapped")
	const text = output.getByTestId("text")
	expect(await text.innerHTML()).toBe(
		'{"id":"text$877e9385-8cbd-4af2-bd65-f31d3a2588cf","slice_type":"text","foo":"bar"}',
	)
	const image = output.getByTestId("image")
	expect(await image.innerHTML()).toBe(
		'{"id":"image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1","slice_type":"image","bar":"baz"}',
	)
})

test("adds comment boundaries around slices with IDs", async ({ page }) => {
	await page.goto("/SliceZone")

	const filled = page.getByTestId("filled")
	await expect
		.poll(() => getSliceComments(filled))
		.toEqual([
			"prismic-slice-start:text$877e9385-8cbd-4af2-bd65-f31d3a2588cf",
			"prismic-slice-end:text$877e9385-8cbd-4af2-bd65-f31d3a2588cf",
			"prismic-slice-start:image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1",
			"prismic-slice-end:image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1",
		])

	expect(await getSliceComments(page.getByTestId("graphql"))).toEqual([])
})

const elementNodes = [
	"<!--prismic-slice-start:element-id-->",
	{ tag: "DIV", text: "element-id" },
	"<!--prismic-slice-end:element-id-->",
]
const fragmentNodes = [
	"<!--prismic-slice-start:fragment-id-->",
	{ tag: "SPAN", text: "fragment-id-first" },
	{ tag: "SPAN", text: "fragment-id-second" },
	"<!--prismic-slice-end:fragment-id-->",
]
const emptyNodes = ["<!--prismic-slice-start:empty-id-->", "<!--prismic-slice-end:empty-id-->"]

test("keeps comment boundaries aligned when slices change", async ({ page }) => {
	const response = await page.request.get("/SliceZone/markers")
	expect(await response.text()).not.toContain("<!--prismic-slice-")

	await page.goto("/SliceZone/markers")

	const client = page.getByTestId("client")
	const output = client.getByTestId("client-output")

	await expect
		.poll(() => getSliceNodes(output))
		.toEqual([...elementNodes, ...fragmentNodes, ...emptyNodes])

	await client.getByRole("button", { name: "Reverse" }).click()
	await expect
		.poll(() => getSliceNodes(output))
		.toEqual([...emptyNodes, ...fragmentNodes, ...elementNodes])

	await client.getByRole("button", { name: "Remove first" }).click()
	await expect.poll(() => getSliceNodes(output)).toEqual([...fragmentNodes, ...elementNodes])

	await client.getByRole("button", { name: "Remove first" }).click()
	await expect.poll(() => getSliceNodes(output)).toEqual(elementNodes)

	await client.getByRole("button", { name: "Remove first" }).click()
	await expect.poll(() => getSliceNodes(output)).toEqual([])
})

test("replaces old comment boundaries when Slice IDs change", async ({ page }) => {
	await page.goto("/SliceZone/markers")

	const client = page.getByTestId("client")
	const output = client.getByTestId("client-output")

	await expect
		.poll(() => getSliceNodes(output))
		.toEqual([...elementNodes, ...fragmentNodes, ...emptyNodes])

	await client.getByRole("button", { name: "Replace IDs" }).click()
	await expect
		.poll(() => getSliceNodes(output))
		.toEqual([
			"<!--prismic-slice-start:element-id-updated-->",
			{ tag: "DIV", text: "element-id-updated" },
			"<!--prismic-slice-end:element-id-updated-->",
			"<!--prismic-slice-start:fragment-id-updated-->",
			{ tag: "SPAN", text: "fragment-id-updated-first" },
			{ tag: "SPAN", text: "fragment-id-updated-second" },
			"<!--prismic-slice-end:fragment-id-updated-->",
			"<!--prismic-slice-start:empty-id-updated-->",
			"<!--prismic-slice-end:empty-id-updated-->",
		])
})

function getSliceNodes(locator: Locator) {
	return locator.evaluate((element) =>
		Array.from(element.childNodes)
			.map((node) => {
				// Read content without depending on React's internal hydration comments.
				if (node instanceof Element) return { tag: node.tagName, text: node.textContent }
				if (node instanceof Text) return node.data || null
				if (node instanceof Comment && node.data.startsWith("prismic-slice-")) {
					return `<!--${node.data}-->`
				}

				return null
			})
			.filter((node) => node !== null),
	)
}

function getSliceComments(locator: Locator) {
	return locator.evaluate((element) => {
		const comments: string[] = []
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_COMMENT)

		while (walker.nextNode()) {
			const value = walker.currentNode.textContent
			if (value?.startsWith("prismic-slice-")) comments.push(value)
		}

		return comments
	})
}
