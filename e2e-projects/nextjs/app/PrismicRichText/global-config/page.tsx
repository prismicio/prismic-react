import { ComponentType } from "react";
import { isFilled } from "@prismicio/client";
import { LinkProps, PrismicRichText } from "@prismicio/react";
import assert from "assert";

import { createClient } from "@/prismicio";

const defaultInternalComponentConfigKey = Symbol.for(
	"@prismicio/react/PrismicLink/defaultInternalComponent",
);
(
	globalThis as {
		[defaultInternalComponentConfigKey]?: ComponentType<LinkProps>;
	}
)[defaultInternalComponentConfigKey] = (props) => (
	<a data-testid="global-internal-link" {...props} />
);

export default async function Page() {
	const client = await createClient();
	const { data: tests } = await client.getSingle("rich_text_test");

	assert(isFilled.richText(tests.hyperlink_internal));
	assert(isFilled.richText(tests.hyperlink_external));

	return (
		<>
			<div data-testid="uses-global">
				<PrismicRichText field={tests.hyperlink_internal} />
			</div>

			<div data-testid="override">
				<PrismicRichText
					field={tests.hyperlink_internal}
					internalLinkComponent={(props) => (
						<a data-testid="override-internal-link" {...props} />
					)}
				/>
			</div>

			<div data-testid="external-unaffected">
				<PrismicRichText field={tests.hyperlink_external} />
			</div>
		</>
	);
}
