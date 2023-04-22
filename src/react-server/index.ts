export { PrismicLink } from "./PrismicLink";
export { PrismicRichText } from "./PrismicRichText";

export {
	PrismicProvider,
	useAllPrismicDocumentsByEveryTag,
	useAllPrismicDocumentsByIDs,
	useAllPrismicDocumentsBySomeTags,
	useAllPrismicDocumentsByTag,
	useAllPrismicDocumentsByType,
	useAllPrismicDocumentsByUIDs,
	useAllPrismicDocumentsDangerously,
	useFirstPrismicDocument,
	usePrismicClient,
	usePrismicContext,
	usePrismicDocumentByID,
	usePrismicDocumentByUID,
	usePrismicDocuments,
	usePrismicDocumentsByEveryTag,
	usePrismicDocumentsByIDs,
	usePrismicDocumentsBySomeTags,
	usePrismicDocumentsByTag,
	usePrismicDocumentsByType,
	usePrismicDocumentsByUIDs,
	usePrismicPreviewResolver,
	useSinglePrismicDocument,
} from "./unsupported";

// The following exports do not have RSC-specific implementations.
// They are aliases for the default package exports.
export {
	Element,
	PrismicImage,
	PrismicText,
	PrismicToolbar,
	SliceZone,
	TODOSliceComponent,
} from "..";
