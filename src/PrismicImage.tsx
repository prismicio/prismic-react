import * as React from "react";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { __PRODUCTION__ } from "./lib/__PRODUCTION__";
import { devMsg } from "./lib/devMsg";

/**
 * Props for `<PrismicImage>`.
 */
export type PrismicImageProps = Omit<
	React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>,
	"src" | "srcset" | "alt"
> & {
	/**
	 * The Prismic Image field or thumbnail to render.
	 */
	field: prismicT.ImageFieldImage | null | undefined;

	/**
	 * An object of Imgix URL API parameters to transform the image.
	 *
	 * See: https://docs.imgix.com/apis/rendering
	 */
	imgixParams?: Parameters<typeof prismicH.asImageSrc>[1];

	/**
	 * Declare an image as decorative by providing `alt=""`.
	 *
	 * See:
	 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#decorative_images
	 */
	alt?: "";

	/**
	 * Declare an image as decorative only if the Image field does not have
	 * alternative text by providing `fallbackAlt=""`.
	 *
	 * See:
	 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#decorative_images
	 */
	fallbackAlt?: "";
} & (
		| {
				/**
				 * Widths used to build a `srcset` value for the Image field.
				 *
				 * If a `widths` prop is not given or `"defaults"` is passed, the
				 * following widths will be used: 640, 750, 828, 1080, 1200, 1920, 2048, 3840.
				 *
				 * If the Image field contains responsive views, each responsive view
				 * can be used as a width in the resulting `srcset` by passing
				 * `"thumbnails"` as the `widths` prop.
				 */
				widths?:
					| NonNullable<
							Parameters<typeof prismicH.asImageWidthSrcSet>[1]
					  >["widths"]
					| "defaults";
				/**
				 * Not used when the `widths` prop is used.
				 */
				pixelDensities?: never;
		  }
		| {
				/**
				 * Not used when the `widths` prop is used.
				 */
				widths?: never;
				/**
				 * Pixel densities used to build a `srcset` value for the Image field.
				 *
				 * If a `pixelDensities` prop is passed `"defaults"`, the following
				 * pixel densities will be used: 1, 2, 3.
				 */
				pixelDensities:
					| NonNullable<
							Parameters<typeof prismicH.asImagePixelDensitySrcSet>[1]
					  >["pixelDensities"]
					| "defaults";
		  }
	);

const _PrismicImage = (
	props: PrismicImageProps,
	ref: React.ForwardedRef<HTMLImageElement>,
): JSX.Element | null => {
	const {
		field,
		alt,
		fallbackAlt,
		imgixParams,
		widths,
		pixelDensities,
		...restProps
	} = props;

	if (!__PRODUCTION__) {
		if (typeof alt === "string" && props.alt !== "") {
			console.warn(
				`[PrismicImage] The "alt" prop can only be used to declare an image as decorative by passing an empty string (alt="") but was provided a non-empty string. You can resolve this warning by removing the "alt" prop or changing it to alt="". For more details, see ${devMsg(
					"alt-must-be-an-empty-string",
				)}`,
			);
		}

		if (typeof fallbackAlt === "string" && fallbackAlt !== "") {
			console.warn(
				`[PrismicImage] The "fallbackAlt" prop can only be used to declare an image as decorative by passing an empty string (fallbackAlt="") but was provided a non-empty string. You can resolve this warning by removing the "fallbackAlt" prop or changing it to fallbackAlt="". For more details, see ${devMsg(
					"alt-must-be-an-empty-string",
				)}`,
			);
		}

		if (widths && pixelDensities) {
			console.warn(
				`[PrismicImage] Only one of "widths" or "pixelDensities" props can be provided. You can resolve this warning by removing either the "widths" or "pixelDensities" prop. "widths" will be used in this case.`,
			);
		}
	}

	if (prismicH.isFilled.imageThumbnail(field)) {
		let src: string | undefined;
		let srcSet: string | undefined;

		if (widths || !pixelDensities) {
			const res = prismicH.asImageWidthSrcSet(field, {
				...imgixParams,
				widths: widths === "defaults" ? undefined : widths,
			});

			src = res.src;
			srcSet = res.srcset;
		} else if (pixelDensities) {
			const res = prismicH.asImagePixelDensitySrcSet(field, {
				...imgixParams,
				pixelDensities:
					pixelDensities === "defaults" ? undefined : pixelDensities,
			});

			src = res.src;
			srcSet = res.srcset;
		}

		return (
			<img
				ref={ref}
				src={src}
				srcSet={srcSet}
				alt={alt ?? (field.alt || fallbackAlt)}
				{...restProps}
			/>
		);
	} else {
		return null;
	}
};

if (!__PRODUCTION__) {
	_PrismicImage.displayName = "PrismicImage";
}

/**
 * React component that renders an image from a Prismic Image field or one of
 * its thumbnails. It will automatically set the `alt` attribute using the Image
 * field's `alt` property.
 *
 * By default, a widths-based srcset will be used to support responsive images.
 * This ensures only the smallest image needed for a browser is downloaded.
 *
 * To use a pixel-density-based srcset, use the `pixelDensities` prop. Default
 * pixel densities can be used by using `pixelDensities="defaults"`.
 *
 * **Note**: If you are using a framework that has a native image component,
 * such as Next.js and Gatsby, prefer using those image components instead. They
 * can provide deeper framework integration than `<PrismicImage>`.
 *
 * @param props - Props for the component.
 *
 * @returns A responsive image component for the given Image field.
 */
export const PrismicImage = React.forwardRef(_PrismicImage);
