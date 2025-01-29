import {
	ForwardedRef,
	forwardRef,
	type ComponentProps,
	FC,
	ReactNode,
} from "react";
import {
	type ImageFieldImage,
	asImagePixelDensitySrcSet,
	asImageWidthSrcSet,
	isFilled,
} from "@prismicio/client";
import { DEV } from "esm-env";

import { devMsg } from "./lib/devMsg.js";

type ImgixURLParams = Omit<
	NonNullable<Parameters<typeof asImageWidthSrcSet>[1]>,
	"widths"
> &
	Omit<
		NonNullable<Parameters<typeof asImagePixelDensitySrcSet>[1]>,
		"pixelDensities"
	>;

/**
 * Props for `<PrismicImage>`.
 */
export type PrismicImageProps = Omit<
	ComponentProps<"img">,
	"src" | "srcset" | "alt"
> & {
	/**
	 * The Prismic Image field or thumbnail to render.
	 */
	field: ImageFieldImage | null | undefined;

	/**
	 * An object of Imgix URL API parameters to transform the image.
	 *
	 * See: https://docs.imgix.com/apis/rendering
	 */
	imgixParams?: { [P in keyof ImgixURLParams]: ImgixURLParams[P] | null };

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

	/**
	 * The value to be rendered when the field is empty. If a fallback is not
	 * given, `null` will be rendered.
	 */
	fallback?: ReactNode;
} & (
		| {
				/**
				 * Widths used to build a `srcset` value for the Image field.
				 *
				 * If a `widths` prop is not given or `"defaults"` is passed, the
				 * following widths will be used: 640, 750, 828, 1080, 1200, 1920, 2048,
				 * 3840.
				 *
				 * If the Image field contains responsive views, each responsive view
				 * can be used as a width in the resulting `srcset` by passing
				 * `"thumbnails"` as the `widths` prop.
				 */
				widths?:
					| NonNullable<Parameters<typeof asImageWidthSrcSet>[1]>["widths"]
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
							Parameters<typeof asImagePixelDensitySrcSet>[1]
					  >["pixelDensities"]
					| "defaults";
		  }
	);

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
export const PrismicImage: FC<PrismicImageProps> = forwardRef(
	function PrismicImage(
		props: PrismicImageProps,
		ref: ForwardedRef<HTMLImageElement>,
	) {
		const {
			field,
			alt,
			fallbackAlt,
			imgixParams = {},
			widths,
			pixelDensities,
			fallback,
			...restProps
		} = props;

		if (DEV) {
			if (typeof alt === "string" && alt !== "") {
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

		if (!isFilled.imageThumbnail(field)) {
			return <>{fallback}</>;
		}

		const resolvedImgixParams = imgixParams;
		for (const x in imgixParams) {
			if (resolvedImgixParams[x as keyof typeof resolvedImgixParams] === null) {
				resolvedImgixParams[x as keyof typeof resolvedImgixParams] = undefined;
			}
		}

		let src: string | undefined;
		let srcSet: string | undefined;

		if (widths || !pixelDensities) {
			const res = asImageWidthSrcSet(field, {
				...resolvedImgixParams,
				widths: widths === "defaults" ? undefined : widths,
			} as ImgixURLParams);

			src = res.src;
			srcSet = res.srcset;
		} else if (pixelDensities) {
			const res = asImagePixelDensitySrcSet(field, {
				...resolvedImgixParams,
				pixelDensities:
					pixelDensities === "defaults" ? undefined : pixelDensities,
			} as ImgixURLParams);

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
	},
);
