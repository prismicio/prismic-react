import * as prismic from "@prismicio/client";
import * as prismicT from "@prismicio/types";

import { createDocument } from "./createDocument";

export const createQueryResponse = <
	TDocument extends prismicT.PrismicDocument = prismicT.PrismicDocument,
>(
	docs: TDocument[] = [createDocument(), createDocument()],
	overrides?: Partial<prismic.Query<TDocument>>,
): prismic.Query<TDocument> => ({
	page: 1,
	results_per_page: docs.length,
	results_size: docs.length,
	total_results_size: docs.length,
	total_pages: 1,
	next_page: "",
	prev_page: "",
	results: docs,
	...overrides,
});
