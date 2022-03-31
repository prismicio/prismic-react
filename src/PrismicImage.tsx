import * as React from "react";
import * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { __PRODUCTION__ } from "./lib/__PRODUCTION__";

export type PrismicImageProps = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
> & {
	field: prismicT.ImageField | null | undefined;

	imgixParams?: Parameters<typeof prismicH.asImageSrc>[1];

	alt?: string;

	fallbackAlt?: string;
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

	if (prismicH.isFilled.imageThumbnail(field)) {
		if (!__PRODUCTION__ && "widths" in props && "pixelDensities" in props) {
			console.warn(
				`[PrismicImage] Only one of "widths" or "pixelDensities" props can be provided. "widths" will be used in this case.`,
			);
		}

		let src: string | undefined;
		let srcSet: string | undefined;

		if ("widths" in props || !("pixelDensities" in props)) {
			const res = prismicH.asImageWidthSrcSet(field, {
				...imgixParams,
				widths: widths === "defaults" ? undefined : widths,
			});

			src = res.src;
			srcSet = res.srcset;
		} else if ("pixelDensities" in props) {
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
