import type { ReactNode } from "react";
import { PrismicToolbar } from "@prismicio/react";

import { createClient } from "@/prismicio";

export default async function Page(): Promise<ReactNode> {
	const client = await createClient();

	return <PrismicToolbar repositoryName={client.repositoryName} />;
}
