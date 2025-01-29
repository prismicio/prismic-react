"use client";

import { useState } from "react";
import { PrismicLink } from "@prismicio/react";

export default function Page() {
	const [ref, setRef] = useState<Element | null>(null);

	return (
		<PrismicLink ref={setRef} href="" data-testid="ref">
			tagname: {ref?.tagName}
		</PrismicLink>
	);
}
