export { SliceZone, TODOSliceComponent } from "./SliceZone";
export type {
	SliceComponentProps,
	SliceComponentType,
	SliceLike,
	SliceLikeGraphQL,
	SliceLikeRestV2,
	SliceZoneLike,
	SliceZoneProps,
} from "./SliceZone";

export { PrismicLink } from "./PrismicLink";
export type { LinkProps, PrismicLinkProps } from "./PrismicLink";

export { PrismicRichText } from "./PrismicRichText";
export type { PrismicRichTextProps } from "./PrismicRichText";

export { getPrismicToolbarSrc } from "./getPrismicToolbarSrc";

// These exports do not have RSC-specific implementations.
// They are aliases for the root-level exports.
export { PrismicImage, PrismicText, Element } from "..";
export type {
	PrismicImageProps,
	PrismicTextProps,
	JSXMapSerializer,
	JSXFunctionSerializer,
} from "..";
