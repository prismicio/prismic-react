import * as ava from "ava";
import * as msw from "msw";
import * as prismic from "@prismicio/client";

import { createRepositoryResponse } from "./createRepositoryResponse";
import { md5 } from "./md5";

export const createMockRepositoryHandler = (
	t: ava.ExecutionContext,
	response = createRepositoryResponse(),
): msw.RestHandler => {
	const repositoryName = md5(t.title);
	const endpoint = prismic.getEndpoint(repositoryName);

	return msw.rest.get(endpoint, (_req, res, ctx) => {
		return res(ctx.json(response));
	});
};
