"use client";

import { PrismicLink } from "@prismicio/react";
import type { ReactNode } from "react";
import { useState } from "react";

export default function Page(): ReactNode {
	const [ref, setRef] = useState<Element | null>(null);

	return (
		<PrismicLink ref={setRef} href="" data-testid="ref">
			tagname: {ref?.tagName}
		</PrismicLink>
	);
}
