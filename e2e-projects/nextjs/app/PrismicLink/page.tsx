import type { ReactNode } from "react";
import Link from "next/link";
import { isFilled } from "@prismicio/client";
import { PrismicLink } from "@prismicio/react";
import assert from "assert";

import { createClient } from "@/prismicio";

export default async function Page(): Promise<ReactNode> {
	const client = await createClient();
	const { data: tests } = await client.getSingle("link_test");
	assert(
		isFilled.link(tests.document) &&
			tests.document.link_type === "Document" &&
			tests.document.url,
	);
	const doc = await client.getByID(tests.document.id);

	assert(isFilled.link(tests.media) && tests.media.link_type === "Media");
	assert(
		isFilled.link(tests.internal_web) &&
			tests.internal_web.link_type === "Web" &&
			!tests.internal_web.url.startsWith("http"),
	);
	assert(
		isFilled.link(tests.external_web) &&
			tests.external_web.link_type === "Web" &&
			tests.external_web.url.startsWith("http"),
	);
	assert(
		isFilled.link(tests.external_web_with_target) &&
			tests.external_web_with_target.link_type === "Web" &&
			tests.external_web_with_target.url.startsWith("http") &&
			tests.external_web_with_target.target,
	);
	assert(isFilled.link(tests.with_text) && tests.with_text.text);

	return (
		<>
			<PrismicLink
				data-testid="document-link-with-route-resolver"
				field={tests.document}
			/>
			<PrismicLink
				data-testid="document-link-with-link-resolver"
				field={tests.document}
				linkResolver={(link) => `/${link.type}`}
			/>

			<PrismicLink data-testid="media-link" field={tests.media} />

			<PrismicLink
				data-testid="document-prop-with-route-resolver"
				document={doc}
			/>
			<PrismicLink
				data-testid="document-prop-with-link-resolver"
				document={doc}
				linkResolver={(link) => `/${link.type}`}
			/>

			<PrismicLink data-testid="internal-web" field={tests.internal_web} />
			<PrismicLink data-testid="external-web" field={tests.external_web} />
			<PrismicLink
				data-testid="external-web-with-target"
				field={tests.external_web_with_target}
			/>
			<PrismicLink
				data-testid="external-web-with-target-override"
				field={tests.external_web_with_target}
				target="foo"
			/>
			<PrismicLink
				data-testid="external-web-with-rel-prop"
				field={tests.external_web}
				rel="foo"
			/>
			<PrismicLink
				data-testid="external-web-with-removed-rel"
				field={tests.external_web}
				rel={undefined}
			/>
			<PrismicLink
				data-testid="external-web-with-rel-function"
				field={tests.external_web}
				rel={(payload) => JSON.stringify(payload)}
			/>

			<PrismicLink
				data-testid="external-href-prop"
				href="https://example.com"
			/>
			<PrismicLink data-testid="internal-href-prop" href="/example" />
			{/* @ts-expect-error - We are purposely providing an invalid `href` value. */}
			<PrismicLink data-testid="falsy-href-prop" href={undefined} />
			<Link data-testid="default-link-falsy-href" href="" />

			<PrismicLink data-testid="with-text" field={tests.with_text} />
			<PrismicLink data-testid="with-text-override" field={tests.with_text}>
				override
			</PrismicLink>
		</>
	);
}
