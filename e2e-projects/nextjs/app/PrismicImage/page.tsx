import type { ReactNode } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";
import assert from "assert";

import { createClient } from "@/prismicio";

export default async function Page(): Promise<ReactNode> {
	const client = await createClient();
	const { data: tests } = await client.getSingle("image_test");

	assert(
		isFilled.image(tests.with_alt_text) && tests.with_alt_text.alt !== null,
	);
	assert(
		isFilled.image(tests.without_alt_text) &&
			tests.without_alt_text.alt === null,
	);
	assert(isFilled.image(tests.filled));
	assert(!isFilled.image(tests.empty));
	assert(
		isFilled.image(tests.with_crop) &&
			new URL(tests.with_crop.url).searchParams.get("rect") !== null,
	);
	assert(
		isFilled.image(tests.with_thumbnails) &&
			isFilled.imageThumbnail(tests.with_thumbnails.foo) &&
			isFilled.imageThumbnail(tests.with_thumbnails.bar),
	);

	return (
		<>
			<PrismicImage data-testid="filled" field={tests.filled} />
			<PrismicImage data-testid="empty" field={tests.empty} />

			<div data-testid="fallback">
				<PrismicImage field={tests.empty} fallback="foo" />
			</div>

			<PrismicImage
				data-testid="widths"
				field={tests.filled}
				widths={[100, 200, 300]}
			/>
			<PrismicImage
				data-testid="default-widths"
				field={tests.filled}
				widths="defaults"
			/>
			<PrismicImage
				data-testid="thumbnail-widths"
				field={tests.with_thumbnails}
				widths="thumbnails"
			/>

			<PrismicImage
				data-testid="pixel-densities"
				field={tests.filled}
				pixelDensities={[9, 10]}
			/>
			<PrismicImage
				data-testid="default-pixel-densities"
				field={tests.filled}
				pixelDensities="defaults"
			/>

			{/* @ts-expect-error - Purposely giving incompatible props. */}
			<PrismicImage
				data-testid="prioritize-widths-over-pixel-densities"
				field={tests.filled}
				widths={[100, 200, 300]}
				pixelDensities={[9, 10]}
			/>

			<PrismicImage data-testid="with-alt" field={tests.with_alt_text} />
			<PrismicImage data-testid="without-alt" field={tests.without_alt_text} />
			<PrismicImage
				data-testid="with-decorative-fallback-alt"
				field={tests.without_alt_text}
				fallbackAlt=""
			/>
			<PrismicImage
				data-testid="with-decorative-alt"
				field={tests.without_alt_text}
				alt=""
			/>

			<PrismicImage
				data-testid="imgix"
				field={tests.filled}
				imgixParams={{ sat: -100 }}
			/>
			<PrismicImage
				data-testid="imgix-override"
				field={tests.with_crop}
				imgixParams={{ rect: [0, 0, 100, 100] }}
			/>
		</>
	);
}
