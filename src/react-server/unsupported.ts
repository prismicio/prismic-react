// Exports in this file are unsupported in the react-server environment.
// All environments should export the same functions to maintian API compatability.

function buildErrorMessage(fnName: string) {
	return `${fnName} is not supported in Server Components. Remove all uses of ${fnName} in Server Components.`;
}

function buildHookErrorMessage(fnName: string) {
	return `${fnName} is not supported in Server Components. Replace all uses of ${fnName} in Server Components with direct use of \`@prismicio/client\`.`;
}

export function PrismicProvider(): JSX.Element {
	throw new Error(buildErrorMessage("<PrismicProvider>"));
}

export function usePrismicContext() {
	throw new Error(buildErrorMessage("usePrismicContext()"));
}

export function usePrismicClient() {
	throw new Error(buildHookErrorMessage("usePrismicClient()"));
}

export function usePrismicPreviewResolver() {
	throw new Error(buildHookErrorMessage("usePrismicPreviewResolver()"));
}

export function useAllPrismicDocumentsDangerously() {
	throw new Error(buildHookErrorMessage("useAllPrismicDocumentsDangerously()"));
}

export function useAllPrismicDocumentsByEveryTag() {
	throw new Error(buildHookErrorMessage("useAllPrismicDocumentsByEveryTag()"));
}

export function useAllPrismicDocumentsByIDs() {
	throw new Error(buildHookErrorMessage("useAllPrismicDocumentsByIDs()"));
}

export function useAllPrismicDocumentsBySomeTags() {
	throw new Error(buildHookErrorMessage("useAllPrismicDocumentsBySomeTags()"));
}

export function useAllPrismicDocumentsByTag() {
	throw new Error(buildHookErrorMessage("useAllPrismicDocumentsByTag()"));
}

export function useAllPrismicDocumentsByType() {
	throw new Error(buildHookErrorMessage("useAllPrismicDocumentsByType()"));
}

export function useAllPrismicDocumentsByUIDs() {
	throw new Error(buildHookErrorMessage("useAllPrismicDocumentsByUIDs()"));
}

export function useFirstPrismicDocument() {
	throw new Error(buildHookErrorMessage("useFirstPrismicDocument()"));
}

export function usePrismicDocumentByID() {
	throw new Error(buildHookErrorMessage("usePrismicDocumentByID()"));
}

export function usePrismicDocumentByUID() {
	throw new Error(buildHookErrorMessage("usePrismicDocumentByUID()"));
}

export function usePrismicDocuments() {
	throw new Error(buildHookErrorMessage("usePrismicDocuments()"));
}

export function usePrismicDocumentsByEveryTag() {
	throw new Error(buildHookErrorMessage("usePrismicDocumentsByEveryTag()"));
}

export function usePrismicDocumentsByIDs() {
	throw new Error(buildHookErrorMessage("usePrismicDocumentsByIDs()"));
}

export function usePrismicDocumentsBySomeTags() {
	throw new Error(buildHookErrorMessage("usePrismicDocumentsBySomeTags()"));
}

export function usePrismicDocumentsByTag() {
	throw new Error(buildHookErrorMessage("usePrismicDocumentsByTag()"));
}

export function usePrismicDocumentsByType() {
	throw new Error(buildHookErrorMessage("usePrismicDocumentsByType()"));
}

export function usePrismicDocumentsByUIDs() {
	throw new Error(buildHookErrorMessage("usePrismicDocumentsByUIDs()"));
}

export function useSinglePrismicDocument() {
	throw new Error(buildHookErrorMessage("useSinglePrismicDocument()"));
}
