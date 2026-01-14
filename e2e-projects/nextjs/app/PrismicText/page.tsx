import type { ReactNode } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import assert from "assert";

import { createClient } from "@/prismicio";

export default async function Page(): Promise<ReactNode> {
	const client = await createClient();
	const { data: tests } = await client.getSingle("rich_text_test");

	assert(isFilled.richText(tests.filled));
	assert(!isFilled.richText(tests.empty));
	assert(isFilled.keyText(tests.keytext));
	assert(isFilled.select(tests.select));

	return (
		<>
			<div data-testid="filled">
				<PrismicText field={tests.filled} />
			</div>

			<div data-testid="empty">
				<PrismicText field={tests.empty} />
			</div>

			<div data-testid="fallback">
				<PrismicText field={tests.empty} fallback="foo" />
			</div>

			<div data-testid="keytext">
				{/* @ts-expect-error - We are purposely providing an field. */}
				<PrismicText field={tests.keytext} />
			</div>
			<div data-testid="select">
				{/* @ts-expect-error - We are purposely providing an field. */}
				<PrismicText field={tests.keytext} />
			</div>

			<div data-testid="custom-separator">
				<PrismicText field={tests.filled} separator="x" />
			</div>
		</>
	);
}
