import { isFilled } from "@prismicio/client";
import assert from "assert";

import { createClient } from "@/prismicio";
import { ClientTest } from "./ClientTest";

export default async function Page() {
	const client = await createClient();
	const { data: tests } = await client.getSingle("image_test");

	assert(isFilled.image(tests.filled));

	return <ClientTest field={tests.filled} />;
}
