import { it, expect, vi } from "vitest";

import { renderJSON } from "../__testutils__/renderJSON";

import {
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
} from "../../src/react-server";

function itThrowsUnsupportedMessage(fn: () => void) {
	it("throws an unsupported message", () => {
		expect(() => fn()).toThrow(/not supported/i);
	});
}

it("PrismicProvider throws an unsupported message", () => {
	const consoleErrorSpy = vi
		.spyOn(globalThis.console, "error")
		.mockImplementation(() => void 0);

	expect(() => {
		renderJSON(<PrismicProvider />);
	}).toThrow(/not supported/i);

	consoleErrorSpy.mockRestore();
});

itThrowsUnsupportedMessage(() => useAllPrismicDocumentsByEveryTag());
itThrowsUnsupportedMessage(() => useAllPrismicDocumentsByIDs());
itThrowsUnsupportedMessage(() => useAllPrismicDocumentsBySomeTags());
itThrowsUnsupportedMessage(() => useAllPrismicDocumentsByTag());
itThrowsUnsupportedMessage(() => useAllPrismicDocumentsByType());
itThrowsUnsupportedMessage(() => useAllPrismicDocumentsByUIDs());
itThrowsUnsupportedMessage(() => useAllPrismicDocumentsDangerously());
itThrowsUnsupportedMessage(() => useFirstPrismicDocument());
itThrowsUnsupportedMessage(() => usePrismicClient());
itThrowsUnsupportedMessage(() => usePrismicContext());
itThrowsUnsupportedMessage(() => usePrismicDocumentByID());
itThrowsUnsupportedMessage(() => usePrismicDocumentByUID());
itThrowsUnsupportedMessage(() => usePrismicDocuments());
itThrowsUnsupportedMessage(() => usePrismicDocumentsByEveryTag());
itThrowsUnsupportedMessage(() => usePrismicDocumentsByIDs());
itThrowsUnsupportedMessage(() => usePrismicDocumentsBySomeTags());
itThrowsUnsupportedMessage(() => usePrismicDocumentsByTag());
itThrowsUnsupportedMessage(() => usePrismicDocumentsByType());
itThrowsUnsupportedMessage(() => usePrismicDocumentsByUIDs());
itThrowsUnsupportedMessage(() => usePrismicPreviewResolver());
itThrowsUnsupportedMessage(() => useSinglePrismicDocument());
