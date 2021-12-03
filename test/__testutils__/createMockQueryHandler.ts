import * as ava from "ava";
import * as msw from "msw";
import * as prismicT from "@prismicio/types";

import { createQueryResponse } from "./createQueryResponse";
import { md5 } from "./md5";

const castArray = <A>(a: A | A[]): A[] => (Array.isArray(a) ? a : [a]);

export const createMockQueryHandler = <
	TDocument extends prismicT.PrismicDocument = prismicT.PrismicDocument,
>(
	t: ava.ExecutionContext,
	pagedResponses: Partial<prismicT.Query<TDocument>>[] = [
		createQueryResponse(),
	],
	requiredSearchParams?: Record<
		string,
		string | number | (string | number)[] | undefined
	>,
	debug = true,
): msw.RestHandler => {
	const repositoryName = md5(t.title);
	const endpoint = `https://${repositoryName}.cdn.prismic.io/api/v2/documents/search`;

	return msw.rest.get(endpoint, (req, res, ctx) => {
		const page = Number.parseInt(req.url.searchParams.get("page") ?? "1");

		let requestMatches = true;

		if (requiredSearchParams) {
			const requiredSearchParamsInstance = new URLSearchParams();
			for (const k in requiredSearchParams) {
				castArray(
					requiredSearchParams[k as keyof typeof requiredSearchParams],
				).forEach(
					(l) =>
						l !== undefined &&
						requiredSearchParamsInstance.append(k, l.toString()),
				);
			}

			if (!("page" in requiredSearchParams) && page > 1) {
				requiredSearchParamsInstance.append("page", page.toString());
			}

			// TODO: Remove when the Authorization header can be used
			// @see Related issue - {@link https://github.com/prismicio/issue-tracker-wroom/issues/351}
			const searchParamsWithoutAccessToken = new URLSearchParams(
				req.url.searchParams,
			);
			searchParamsWithoutAccessToken.delete("access_token");

			if (debug) {
				requiredSearchParamsInstance.sort();
				searchParamsWithoutAccessToken.sort();

				t.is(
					requiredSearchParamsInstance.toString(),
					// TODO: Uncomment when the Authorization header can be used
					// @see Related issue - {@link https://github.com/prismicio/issue-tracker-wroom/issues/351}
					// req.url.searchParams.toString()
					searchParamsWithoutAccessToken.toString(),
				);
			}

			requestMatches =
				requiredSearchParamsInstance.toString() ===
				// TODO: Uncomment when the Authorization header can be used
				// @see Related issue - {@link https://github.com/prismicio/issue-tracker-wroom/issues/351}
				// req.url.searchParams.toString()
				searchParamsWithoutAccessToken.toString();
		}

		if (requestMatches) {
			const response = pagedResponses[page - 1];

			return res(ctx.json(response));
		}

		return res(ctx.status(404));
	});
};
