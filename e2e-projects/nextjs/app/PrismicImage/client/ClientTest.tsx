"use client";

import { useState } from "react";
import { ImageField } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";

export function ClientTest(props: { field: ImageField }) {
	const { field } = props;

	const [ref, setRef] = useState<Element | null>(null);

	return (
		<p>
			<PrismicImage ref={setRef} field={field} />
			<span data-testid="ref">tagname: {ref?.tagName}</span>
		</p>
	);
}
