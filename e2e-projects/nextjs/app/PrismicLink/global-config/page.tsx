import { isFilled } from "@prismicio/client";
import { LinkProps, PrismicLink } from "@prismicio/react";
import assert from "assert";

import { createClient } from "@/prismicio";

const globalConfigKey = Symbol.for("@prismicio/react/config");

type GlobalThis = {
	[globalConfigKey]?: {
		internalLinkComponent?: React.ComponentType<LinkProps>;
	};
};

(globalThis as GlobalThis)[globalConfigKey] = {
	internalLinkComponent: (props) => (
		<a data-testid="global-internal-link" {...props} />
	),
};

export default async function Page() {
	const client = await createClient();
	const { data: tests } = await client.getSingle("link_test");

	assert(isFilled.link(tests.internal_web));
	assert(isFilled.link(tests.external_web));

	return (
		<>
			<div data-testid="uses-global">
				<PrismicLink field={tests.internal_web} />
			</div>

			<div data-testid="override">
				<PrismicLink
					field={tests.internal_web}
					internalComponent={(props) => (
						<a data-testid="override-internal-link" {...props} />
					)}
				/>
			</div>

			<div data-testid="external-unaffected">
				<PrismicLink field={tests.external_web} />
			</div>
		</>
	);
}
