export { PrismicProvider } from "./PrismicProvider";
export type {
	PrismicProviderProps,
	PrismicContextValue,
} from "./PrismicProvider";

export { usePrismicContext } from "./usePrismicContext";

export { usePrismicClient } from "./usePrismicClient";

export { PrismicLink } from "./PrismicLink";
export type { PrismicLinkProps, LinkProps } from "./PrismicLink";

export { PrismicText } from "./PrismicText";
export type { PrismicTextProps } from "./PrismicText";

export { PrismicRichText } from "./PrismicRichText";
export type { PrismicRichTextProps } from "./PrismicRichText";

import { Element } from "@prismicio/richtext";
export { Element };
/**
 * @deprecated Renamed to `Element` (without an "s").
 */
// TODO: Remove in v3.
export const Elements = Element;

export { PrismicImage } from "./PrismicImage";
export type { PrismicImageProps } from "./PrismicImage";

export { SliceZone, TODOSliceComponent } from "./SliceZone";
export type {
	SliceComponentProps,
	SliceComponentType,
	SliceLikeRestV2,
	SliceLikeGraphQL,
	SliceLike,
	SliceZoneComponents,
	SliceZoneLike,
	SliceZoneProps,
	SliceZoneResolver,
} from "./SliceZone";

export { PrismicToolbar } from "./PrismicToolbar";
export type { PrismicToolbarProps } from "./PrismicToolbar";

export { usePrismicPreviewResolver } from "./usePrismicPreviewResolver";
export type { UsePrismicPreviewResolverArgs } from "./usePrismicPreviewResolver";

export {
	useAllPrismicDocumentsDangerously,
	useAllPrismicDocumentsByEveryTag,
	useAllPrismicDocumentsByIDs,
	useAllPrismicDocumentsBySomeTags,
	useAllPrismicDocumentsByTag,
	useAllPrismicDocumentsByType,
	useAllPrismicDocumentsByUIDs,
	useFirstPrismicDocument,
	usePrismicDocumentByID,
	usePrismicDocumentByUID,
	usePrismicDocuments,
	usePrismicDocumentsByEveryTag,
	usePrismicDocumentsByIDs,
	usePrismicDocumentsBySomeTags,
	usePrismicDocumentsByTag,
	usePrismicDocumentsByType,
	usePrismicDocumentsByUIDs,
	useSinglePrismicDocument,
} from "./clientHooks";

export type {
	JSXMapSerializer,
	JSXFunctionSerializer,
	PrismicClientHookState,
} from "./types";
