import * as ava from "ava";
import * as prismic from "@prismicio/client";
import fetch from "node-fetch";

import { md5 } from "./md5";

export const createClient = (t: ava.ExecutionContext): prismic.Client => {
	const endpoint = prismic.getEndpoint(md5(t.title));
	const client = prismic.createClient(endpoint, { fetch });

	return client;
};
