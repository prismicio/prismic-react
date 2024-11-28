import { expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import * as prismic from "@prismicio/client";

import { it } from "./it";

import { PrismicImage } from "../src";

it("renders null when passed an empty field", async ({ mock }) => {
	const field = mock.value.image({ state: "empty" });

	const screen = render(<PrismicImage field={field} />);

	expect(screen.container).toContainHTML("");
});

it("renders an img element with a width-based srcset by default", async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const screen = render(<PrismicImage field={field} data-testid="img" />);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("src", src);
	expect(img).toHaveAttribute("srcset", srcset);
	expect(img).toHaveAttribute("alt", field.alt);
});

it("renders a width-based srcset with given widths", async ({ mock }) => {
	const field = mock.value.image({ model: mock.model.image() });
	const widths = [100, 200, 300];
	const { src, srcset } = prismic.asImageWidthSrcSet(field, { widths });

	const screen = render(
		<PrismicImage field={field} widths={widths} data-testid="img" />,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("src", src);
	expect(img).toHaveAttribute("srcset", srcset);
	expect(img).toHaveAttribute("alt", field.alt);
});

it('renders a width-based srcset with default widths if widths is "defaults"', async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	const { src, srcset } = prismic.asImageWidthSrcSet(field);

	const screen = render(
		<PrismicImage field={field} widths="defaults" data-testid="img" />,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("src", src);
	expect(img).toHaveAttribute("srcset", srcset);
	expect(img).toHaveAttribute("alt", field.alt);
});

it('renders a width-based srcset with the field\'s responsive views if widths is "thumbnails"', async ({
	mock,
}) => {
	const field = mock.value.image({
		model: mock.model.image(),
	});
	const { src, srcset } = prismic.asImageWidthSrcSet(field, {
		widths: "thumbnails",
	});

	const screen = render(
		<PrismicImage field={field} widths="thumbnails" data-testid="img" />,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("src", src);
	expect(img).toHaveAttribute("srcset", srcset);
	expect(img).toHaveAttribute("alt", field.alt);
});

it('renders pixel-density srcset with default densities if pixelDensities is "defaults"', async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	const { src, srcset } = prismic.asImagePixelDensitySrcSet(field);

	const screen = render(
		<PrismicImage field={field} pixelDensities="defaults" data-testid="img" />,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("src", src);
	expect(img).toHaveAttribute("srcset", srcset);
	expect(img).toHaveAttribute("alt", field.alt);
});

it("renders pixel-density srcset with the given densities", async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	const pixelDensities = [9, 10];
	const { src, srcset } = prismic.asImagePixelDensitySrcSet(field, {
		pixelDensities,
	});

	const screen = render(
		<PrismicImage
			field={field}
			pixelDensities={pixelDensities}
			data-testid="img"
		/>,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("src", src);
	expect(img).toHaveAttribute("srcset", srcset);
	expect(img).toHaveAttribute("alt", field.alt);
});

it("prioritizes widths prop over pixelDensities", async ({ mock }) => {
	const field = mock.value.image({ model: mock.model.image() });
	const widths = [100, 200, 300];
	const { src, srcset } = prismic.asImageWidthSrcSet(field, { widths });

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	const screen = render(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage
			field={field}
			widths={widths}
			pixelDensities={[9, 10]}
			data-testid="img"
		/>,
	);
	const img = screen.getByTestId("img").element();

	consoleWarnSpy.mockRestore();

	expect(img).toHaveAttribute("src", src);
	expect(img).toHaveAttribute("srcset", srcset);
	expect(img).toHaveAttribute("alt", field.alt);
});

it("warns if both widths and pixelDensites are given", async ({ mock }) => {
	const field = mock.value.image({ model: mock.model.image() });

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	render(
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
});

it("uses the field's alt if given", async ({ mock }) => {
	const field = mock.value.image({ model: mock.model.image() });
	field.alt = "foo";

	const screen = render(<PrismicImage field={field} data-testid="img" />);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("alt", field.alt);
});

it("alt is undefined if the field does not have an alt value", async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	field.alt = null;

	const screen = render(<PrismicImage field={field} data-testid="img" />);
	const img = screen.getByTestId("img").element();

	expect(img).not.toHaveAttribute("alt");
});

it("supports an explicit decorative fallback alt value if given", async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	field.alt = null;

	const screen = render(
		<PrismicImage field={field} fallbackAlt="" data-testid="img" />,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("alt", "");
});

it("warns if a non-decorative fallback alt value is given", async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	render(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage field={field} fallbackAlt="non-decorative" />,
	);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/alt-must-be-an-empty-string/i),
	);

	consoleWarnSpy.mockRestore();
});

it("supports an explicit decorative alt when field has an alt value", async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	field.alt = "provided alt";

	const screen = render(
		<PrismicImage field={field} alt="" data-testid="img" />,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("alt", "");
});

it("supports an explicit decorative alt when field does not have an alt value", async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	field.alt = null;

	const screen = render(
		<PrismicImage field={field} alt="" data-testid="img" />,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("alt", "");
});

it("warns if a non-decorative alt value is given", async ({ mock }) => {
	const field = mock.value.image({ model: mock.model.image() });

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	render(
		// @ts-expect-error - Purposely giving incompatible props.
		<PrismicImage field={field} alt="non-decorative" />,
	);

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/alt-must-be-an-empty-string/i),
	);

	consoleWarnSpy.mockRestore();
});

it("forwards ref", async ({ mock }) => {
	const field = mock.value.image({ model: mock.model.image() });

	let ref = null as HTMLImageElement | null;
	render(
		<PrismicImage
			ref={(el) => {
				ref = el;
			}}
			field={field}
		/>,
	);

	expect(ref?.tagName).toBe("IMG");
});

it("supports imgix parameters", async ({ mock }) => {
	const field = mock.value.image({ model: mock.model.image() });
	const imgixParams = { sat: -100 };
	const { src, srcset } = prismic.asImageWidthSrcSet(field, imgixParams);

	const screen = render(
		<PrismicImage field={field} imgixParams={imgixParams} data-testid="img" />,
	);
	const img = screen.getByTestId("img").element();

	expect(img).toHaveAttribute("src", src);
	expect(img).toHaveAttribute("srcset", srcset);
});

it("allows removing existing Imgix params via the imgixParams prop", async ({
	mock,
}) => {
	const field = mock.value.image({ model: mock.model.image() });
	const fieldURL = new URL(field.url);
	fieldURL.searchParams.set("auto", "compress,format");
	fieldURL.searchParams.set("sat", "-100");
	fieldURL.searchParams.set("ar", "1:2");
	field.url = fieldURL.toString();

	const screen = render(
		<PrismicImage
			field={field}
			imgixParams={{
				auto: undefined,
				// React Server Components removes `undefined`
				// from objects, so we also support `null` as an
				// explicit value to remove a param.
				sat: null,
			}}
			data-testid="img"
		/>,
	);
	const img = screen.getByTestId("img").element();
	const src = new URL(img.getAttribute("src") ?? "");

	expect(src.searchParams.get("auto")).toBe(null);
	expect(src.searchParams.get("sat")).toBe(null);
	expect(src.searchParams.get("ar")).toBe("1:2");
});
