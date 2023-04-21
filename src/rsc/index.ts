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

export { PrismicRichText } from "./PrismicRichText";
export type { PrismicRichTextProps } from "./PrismicRichText";

// These exports do not have RSC-specific implementations.
// They are aliases for the root-level exports.
export { PrismicImage, PrismicLink, PrismicText, Element } from "..";
export type {
	PrismicImageProps,
	PrismicTextProps,
	JSXMapSerializer,
	JSXFunctionSerializer,
} from "..";
