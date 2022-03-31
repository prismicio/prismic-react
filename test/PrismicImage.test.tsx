import test from "ava";
import * as React from "react";
import * as prismicM from "@prismicio/mock";
import * as prismicH from "@prismicio/helpers";
import * as sinon from "sinon";

import { renderJSON } from "./__testutils__/renderJSON";

import { PrismicImage } from "../src";

test("renders null when passed an empty field", async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		state: "empty",
	});

	const actual = renderJSON(<PrismicImage field={field} />);

	t.deepEqual(actual, null);
});

test("renders an img element with a width-based srcset by default", async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const { src, srcset } = prismicH.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders a width-based srcset with given widths", async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const widths = [100, 200, 300];
	const { src, srcset } = prismicH.asImageWidthSrcSet(field, { widths });

	const actual = renderJSON(<PrismicImage field={field} widths={widths} />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	t.deepEqual(actual, expected);
});

test('renders a width-based srcset with default widths if widths is "defaults"', async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const { src, srcset } = prismicH.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} widths="defaults" />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	t.deepEqual(actual, expected);
});

test('renders a width-based srcset with the field\'s responsive views if widths is "thumbnails"', async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const { src, srcset } = prismicH.asImageWidthSrcSet(field, {
		widths: "thumbnails",
	});

	const actual = renderJSON(<PrismicImage field={field} widths="thumbnails" />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	t.deepEqual(actual, expected);
});

test('renders pixel-density srcset with default densities if pixelDensities is "defaults"', async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const { src, srcset } = prismicH.asImagePixelDensitySrcSet(field);

	const actual = renderJSON(
		<PrismicImage field={field} pixelDensities="defaults" />,
	);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("renders pixel-density srcset with the given densities", async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const pixelDensities = [9, 10];
	const { src, srcset } = prismicH.asImagePixelDensitySrcSet(field, {
		pixelDensities,
	});

	const actual = renderJSON(
		<PrismicImage field={field} pixelDensities={pixelDensities} />,
	);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	t.deepEqual(actual, expected);
});

test.serial("prioritizes widths prop over pixelDensities", async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const widths = [100, 200, 300];
	const { src, srcset } = prismicH.asImageWidthSrcSet(field, { widths });

	const consoleWarnStub = sinon.stub(console, "warn");

	const actual = renderJSON(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage field={field} widths={widths} pixelDensities={[9, 10]} />,
	);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	consoleWarnStub.restore();

	t.deepEqual(actual, expected);
});

test.serial("warns if both widths and pixelDensites are given", async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const consoleWarnStub = sinon.stub(console, "warn");

	renderJSON(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage
			field={field}
			widths={[100, 200, 300]}
			pixelDensities={[9, 10]}
		/>,
	);

	consoleWarnStub.restore();

	t.true(
		consoleWarnStub.calledWithMatch(
			/only one of "widths" or "pixelDensities" props can be provided/i,
		),
	);
});

test("uses the field's alt if given", async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	const { src, srcset } = prismicH.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={field.alt || undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("alt is undefined if the field does not have an alt value", async (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});
	field.alt = null;

	const { src, srcset } = prismicH.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt={undefined} />,
	);

	t.deepEqual(actual, expected);
});

test("supports an explicit fallback alt value if given", (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});
	field.alt = null;

	const { src, srcset } = prismicH.asImageWidthSrcSet(field);

	const actual = renderJSON(
		<PrismicImage field={field} fallbackAlt="fallbackAlt" />,
	);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt="fallbackAlt" />,
	);

	t.deepEqual(actual, expected);
});

test("supports overriding alt explicitly when field has an alt value", (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});
	field.alt = "provided alt";

	const { src, srcset } = prismicH.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} alt="explicit alt" />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt="explicit alt" />,
	);

	t.deepEqual(actual, expected);
});

test("supports overriding alt explicitly when field does not have an alt value", (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});
	field.alt = null;

	const { src, srcset } = prismicH.asImageWidthSrcSet(field);

	const actual = renderJSON(<PrismicImage field={field} alt="explicit alt" />);
	const expected = renderJSON(
		<img src={src} srcSet={srcset} alt="explicit alt" />,
	);

	t.deepEqual(actual, expected);
});

test("forwards ref", (t) => {
	const field = prismicM.value.image({
		seed: t.title,
		model: prismicM.model.image({ seed: t.title }),
	});

	let ref = null as HTMLImageElement | null;

	renderJSON(
		<PrismicImage ref={(el) => (ref = el)} field={field} alt="explicit alt" />,
		{
			createNodeMock: (element) => ({ tagName: element.type }),
		},
	);

	t.is(ref?.tagName, "img");
});
