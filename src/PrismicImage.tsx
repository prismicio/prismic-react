import * as React from "react";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { __PRODUCTION__ } from "./lib/__PRODUCTION__";
import { devMsg } from "./lib/devMsg";

export type PrismicImageProps = Omit<
	React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>,
	"src" | "srcset" | "alt"
> & {
	field: prismicT.ImageField | null | undefined;

	imgixParams?: Parameters<typeof prismicH.asImageSrc>[1];

	alt?: "";

	fallbackAlt?: "";
} & (
		| {
				widths?:
					| NonNullable<
							Parameters<typeof prismicH.asImageWidthSrcSet>[1]
					  >["widths"]
					| "defaults";
				pixelDensities?: never;
		  }
		| {
				widths?: never;
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
				`[PrismicImage] The alt prop can only be used to declare an image as decorative by passing an empty string (alt=""). For more details, see ${devMsg(
					"alt-must-be-an-empty-string",
				)}`,
			);
		}

		if (typeof fallbackAlt === "string" && fallbackAlt !== "") {
			console.warn(
				`[PrismicImage] The fallbackAlt prop can only be used to declare an image as decorative by passing an empty string (fallbackAlt=""). For more details, see ${devMsg(
					"alt-must-be-an-empty-string",
				)}`,
			);
		}

		if (widths && pixelDensities) {
			console.warn(
				`[PrismicImage] Only one of "widths" or "pixelDensities" props can be provided. "widths" will be used in this case.`,
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

export const PrismicImage = React.forwardRef(_PrismicImage);
