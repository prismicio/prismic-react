import type { ReactNode } from "react";

import { createClient } from "@/prismicio";
import { PrismicToolbarPreviewEvents } from "./PrismicToolbarPreviewEvents";

export default async function Page(): Promise<ReactNode> {
	const client = await createClient();

	return (
		<PrismicToolbarPreviewEvents repositoryName={client.repositoryName} />
	);
}
