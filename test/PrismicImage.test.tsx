import { it, expect, vi } from "vitest";
import * as prismic from "@prismicio/client";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicImage } from "../src";

it("renders null when passed an empty field", async (ctx) => {
	const field = ctx.mock.value.image({ state: "empty" });

	const actual = renderJSON(<PrismicImage field={field} />);

	expect(actual).toBe(null);
});

it("renders an img element with a width-based srcset by default", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it("renders a width-based srcset with given widths", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const widths = [100, 200, 300];
	const { src, srcset } = prismic.asImageWidthSrcSet(field, { widths });

	const actual = renderJSON(<PrismicImage field={field} widths={widths} />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it('renders a width-based srcset with default widths if widths is "defaults"', async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} widths="defaults" />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it('renders a width-based srcset with the field\'s responsive views if widths is "thumbnails"', async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const { src, srcset } = prismic.asImageWidthSrcSet(field, {
		widths: "thumbnails",
	});

	const actual = renderJSON(<PrismicImage field={field} widths="thumbnails" />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it('renders pixel-density srcset with default densities if pixelDensities is "defaults"', async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const { src, srcset } = prismic.asImagePixelDensitySrcSet(field);

	const actual = renderJSON(
		<PrismicImage field={field} pixelDensities="defaults" />,
	);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it("renders pixel-density srcset with the given densities", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const pixelDensities = [9, 10];
	const { src, srcset } = prismic.asImagePixelDensitySrcSet(field, {
		pixelDensities,
	});

	const actual = renderJSON(
		<PrismicImage field={field} pixelDensities={pixelDensities} />,
	);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it("prioritizes widths prop over pixelDensities", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const widths = [100, 200, 300];
	const { src, srcset } = prismic.asImageWidthSrcSet(field, { widths });

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	const actual = renderJSON(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage field={field} widths={widths} pixelDensities={[9, 10]} />,
	);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	consoleWarnSpy.mockRestore();

	expect(actual).toStrictEqual(expected);
});

it("warns if both widths and pixelDensites are given", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	// The warning only logs in "development".
	const originalNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = "development";
	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	renderJSON(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage
			field={field}
			widths={[100, 200, 300]}
			pixelDensities={[9, 10]}
		/>,
	);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(
			/only one of "widths" or "pixelDensities" props can be provided/i,
		),
	);

	consoleWarnSpy.mockRestore();
	process.env.NODE_ENV = originalNodeEnv;
});

it("uses the field's alt if given", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it("alt is undefined if the field does not have an alt value", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});
	field.alt = null;

	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it("supports an explicit decorative fallback alt value if given", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});
	field.alt = null;

	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} fallbackAlt="" />);
	const expected = renderJSON(<img src={src} srcSet={srcset} alt="" />);

	expect(actual).toStrictEqual(expected);
});

it("warns if a non-decorative fallback alt value is given", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	// The warning only logs in "development".
	const originalNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = "development";
	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	renderJSON(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage field={field} fallbackAlt="non-decorative" />,
	);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/alt-must-be-an-empty-string/i),
	);

	consoleWarnSpy.mockRestore();
	process.env.NODE_ENV = originalNodeEnv;
});

it("supports an explicit decorative alt when field has an alt value", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});
	field.alt = "provided alt";

	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} alt="" />);
	const expected = renderJSON(<img src={src} srcSet={srcset} alt="" />);

	expect(actual).toStrictEqual(expected);
});

it("supports an explicit decorative alt when field does not have an alt value", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});
	field.alt = null;

	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} alt="" />);
	const expected = renderJSON(<img src={src} srcSet={srcset} alt="" />);

	expect(actual).toStrictEqual(expected);
});

it("warns if a non-decorative alt value is given", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	// The warning only logs in "development".
	const originalNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = "development";
	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	renderJSON(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage field={field} alt="non-decorative" />,
	);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/alt-must-be-an-empty-string/i),
	);

	consoleWarnSpy.mockRestore();
	process.env.NODE_ENV = originalNodeEnv;
});

it("forwards ref", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	let ref = null as HTMLImageElement | null;

	renderJSON(<PrismicImage ref={(el) => (ref = el)} field={field} />, {
		createNodeMock: (element) => ({ tagName: element.type }),
	});

	expect(ref?.tagName).toBe("img");
});

it("supports imgix parameters", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});

	const imgixParams = { sat: -100 };
	const { src, srcset } = prismic.asImageWidthSrcSet(field, imgixParams);

	const actual = renderJSON(
		<PrismicImage field={field} imgixParams={imgixParams} />,
	);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	expect(actual).toStrictEqual(expected);
});

it("allows removing existing Imgix params via the imgixParams prop", async (ctx) => {
	const field = ctx.mock.value.image({
		model: ctx.mock.model.image(),
	});
	const fieldURL = new URL(field.url);
	fieldURL.searchParams.set("auto", "compress,format");
	fieldURL.searchParams.set("sat", "-100");
	fieldURL.searchParams.set("ar", "1:2");
	field.url = fieldURL.toString();

	const img = renderJSON(
		<PrismicImage
			field={field}
			imgixParams={{
				auto: undefined,
				// React Server Components removes `undefined`
				// from objects, so we also support `null` as an
				// explicit value to remove a param.
				sat: null,
			}}
		/>,
	);

	const src = new URL(img?.props.src);

	expect(src.searchParams.get("auto")).toBe(null);
	expect(src.searchParams.get("sat")).toBe(null);
	expect(src.searchParams.get("ar")).toBe("1:2");
});
