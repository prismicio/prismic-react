"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { ImageField } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";

export function ClientTest(props: { field: ImageField }): ReactNode {
	const { field } = props;

	const [ref, setRef] = useState<Element | null>(null);

	return (
		<p>
			<PrismicImage ref={setRef} field={field} />
			<span data-testid="ref">tagname: {ref?.tagName}</span>
		</p>
	);
}
