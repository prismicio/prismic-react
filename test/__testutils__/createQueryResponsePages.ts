import * as prismic from "@prismicio/client";
import * as prismicT from "@prismicio/types";

import { createDocument } from "./createDocument";
import { createQueryResponse } from "./createQueryResponse";

type CreateQueryResponsePagesArgs<
	TDocument extends prismicT.PrismicDocument = prismicT.PrismicDocument,
> = {
	numPages?: number;
	numDocsPerPage?: number;
	fields?: Partial<TDocument>;
};

export const createQueryResponsePages = <
	TDocument extends prismicT.PrismicDocument = prismicT.PrismicDocument,
>({
	numPages = 3,
	numDocsPerPage = 3,
	fields,
}: CreateQueryResponsePagesArgs<TDocument> = {}): prismic.Query<TDocument>[] => {
	const documents = Array(numDocsPerPage)
		.fill(undefined)
		.map(() => createDocument(fields));

	return Array(numPages)
		.fill(undefined)
		.map((_, i, arr) =>
			createQueryResponse(documents, {
				page: i + 1,
				total_pages: arr.length,
			}),
		);
};
