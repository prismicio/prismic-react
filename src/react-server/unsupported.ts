// Exports in this file are unsupported in the react-server environment.
// All environments should export the same functions to maintian API compatability.

function buildIncompatibleInServerComponentsErrorMessage(fnName: string) {
	return `${fnName} is not supported in Server Components. Remove ${fnName} in Server Components or add the "use client" directive to the component using ${fnName}.`;
}

function buildIncompatibleQueryHookInServerComponentsErrorMessage(
	fnName: string,
) {
	return `${fnName} is not supported in Server Components. Replace ${fnName} in Server Components with direct use of \`@prismicio/client\` (recommended) or add the "use client" directive to the component using the hook.`;
}

export function PrismicProvider(): JSX.Element {
	throw new Error(
		buildIncompatibleInServerComponentsErrorMessage("<PrismicProvider>"),
	);
}

export function usePrismicContext() {
	throw new Error(
		buildIncompatibleInServerComponentsErrorMessage("usePrismicContext()"),
	);
}

export function usePrismicClient() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicClient()",
		),
	);
}

export function usePrismicPreviewResolver() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicPreviewResolver()",
		),
	);
}

export function useAllPrismicDocumentsDangerously() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useAllPrismicDocumentsDangerously()",
		),
	);
}

export function useAllPrismicDocumentsByEveryTag() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useAllPrismicDocumentsByEveryTag()",
		),
	);
}

export function useAllPrismicDocumentsByIDs() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useAllPrismicDocumentsByIDs()",
		),
	);
}

export function useAllPrismicDocumentsBySomeTags() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useAllPrismicDocumentsBySomeTags()",
		),
	);
}

export function useAllPrismicDocumentsByTag() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useAllPrismicDocumentsByTag()",
		),
	);
}

export function useAllPrismicDocumentsByType() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useAllPrismicDocumentsByType()",
		),
	);
}

export function useAllPrismicDocumentsByUIDs() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useAllPrismicDocumentsByUIDs()",
		),
	);
}

export function useFirstPrismicDocument() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useFirstPrismicDocument()",
		),
	);
}

export function usePrismicDocumentByID() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocumentByID()",
		),
	);
}

export function usePrismicDocumentByUID() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocumentByUID()",
		),
	);
}

export function usePrismicDocuments() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocuments()",
		),
	);
}

export function usePrismicDocumentsByEveryTag() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocumentsByEveryTag()",
		),
	);
}

export function usePrismicDocumentsByIDs() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocumentsByIDs()",
		),
	);
}

export function usePrismicDocumentsBySomeTags() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocumentsBySomeTags()",
		),
	);
}

export function usePrismicDocumentsByTag() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocumentsByTag()",
		),
	);
}

export function usePrismicDocumentsByType() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocumentsByType()",
		),
	);
}

export function usePrismicDocumentsByUIDs() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"usePrismicDocumentsByUIDs()",
		),
	);
}

export function useSinglePrismicDocument() {
	throw new Error(
		buildIncompatibleQueryHookInServerComponentsErrorMessage(
			"useSinglePrismicDocument()",
		),
	);
}
