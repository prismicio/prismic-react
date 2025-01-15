import { PrismicToolbar } from "@prismicio/react";

import { createClient } from "@/prismicio";

export default async function Page() {
	const client = await createClient();

	return <PrismicToolbar repositoryName={client.repositoryName} />;
}
