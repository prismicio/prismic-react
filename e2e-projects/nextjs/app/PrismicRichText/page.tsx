import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import assert from "assert";

import { createClient } from "@/prismicio";

export default async function Page() {
	const client = await createClient();
	const { data: tests } = await client.getSingle("rich_text_test");

	assert(isFilled.richText(tests.filled));
	assert(!isFilled.richText(tests.empty));

	return (
		<>
			<div data-testid="filled">
				<PrismicRichText field={tests.filled} />
			</div>

			<div data-testid="empty">
				<PrismicRichText field={tests.empty} />
			</div>

			<div data-testid="fallback">
				<PrismicRichText field={tests.empty} fallback="foo" />
			</div>

			<div data-testid="heading1">
				<div data-testid="default">
					<PrismicRichText field={tests.heading1} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.heading1}
						components={{
							heading1: ({ children }) => <div data-bar>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="heading2">
				<div data-testid="default">
					<PrismicRichText field={tests.heading2} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.heading2}
						components={{
							heading2: ({ children }) => <div data-bar>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="heading3">
				<div data-testid="default">
					<PrismicRichText field={tests.heading3} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.heading3}
						components={{
							heading3: ({ children }) => <div data-bar>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="heading4">
				<div data-testid="default">
					<PrismicRichText field={tests.heading4} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.heading4}
						components={{
							heading4: ({ children }) => <div data-bar>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="heading5">
				<div data-testid="default">
					<PrismicRichText field={tests.heading5} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.heading5}
						components={{
							heading5: ({ children }) => <div data-bar>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="heading6">
				<div data-testid="default">
					<PrismicRichText field={tests.heading6} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.heading6}
						components={{
							heading6: ({ children }) => <div data-bar>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="paragraph">
				<div data-testid="default">
					<PrismicRichText field={tests.paragraph} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.paragraph}
						components={{
							paragraph: ({ children }) => <div data-bar>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="preformatted">
				<div data-testid="default">
					<PrismicRichText field={tests.preformatted} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.preformatted}
						components={{
							preformatted: ({ children }) => <div data-bar>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="strong">
				<div data-testid="default">
					<PrismicRichText field={tests.strong} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.strong}
						components={{
							strong: ({ children }) => <span data-bar>{children}</span>,
						}}
					/>
				</div>
			</div>

			<div data-testid="em">
				<div data-testid="default">
					<PrismicRichText field={tests.em} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.em}
						components={{
							em: ({ children }) => <span data-bar>{children}</span>,
						}}
					/>
				</div>
			</div>

			<div data-testid="list">
				<div data-testid="default">
					<PrismicRichText field={tests.list} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.list}
						components={{
							list: ({ children }) => <div data-bar>{children}</div>,
							listItem: ({ children }) => <div data-baz>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="ordered-list">
				<div data-testid="default">
					<PrismicRichText field={tests.ordered_list} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.ordered_list}
						components={{
							oList: ({ children }) => <div data-bar>{children}</div>,
							oListItem: ({ children }) => <div data-baz>{children}</div>,
						}}
					/>
				</div>
			</div>

			<div data-testid="image">
				<div data-testid="default">
					<PrismicRichText field={tests.image} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.image}
						components={{
							image: ({ node }) => <div data-bar data-src={node.url} />,
						}}
					/>
				</div>
			</div>

			<div data-testid="embed">
				<div data-testid="default">
					<PrismicRichText field={tests.embed} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.embed}
						components={{
							embed: ({ node }) => (
								<div data-bar data-html={node.oembed.html} />
							),
						}}
					/>
				</div>
			</div>

			<div data-testid="hyperlink">
				<div data-testid="default">
					<PrismicRichText field={tests.hyperlink_external} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.hyperlink_external}
						components={{
							hyperlink: ({ children, node }) => (
								<span data-bar data-url={node.data.url}>
									{children}
								</span>
							),
						}}
					/>
				</div>
				<div data-testid="custom-internal">
					<PrismicRichText
						field={tests.hyperlink_internal}
						internalLinkComponent={({ children, href }) => (
							<a data-href={href} data-testid="internal">
								{children}
							</a>
						)}
					/>
				</div>
				<div data-testid="custom-external">
					<PrismicRichText
						field={tests.hyperlink_external}
						externalLinkComponent={({ children, href }) => (
							<a data-href={href} data-testid="external">
								{children}
							</a>
						)}
					/>
				</div>
			</div>
			<div data-testid="label">
				<div data-testid="default">
					<PrismicRichText field={tests.label} />
				</div>
				<div data-testid="custom">
					<PrismicRichText
						field={tests.label}
						components={{
							label: ({ children, node }) => (
								<span data-bar data-label={node.data.label}>
									{children}
								</span>
							),
						}}
					/>
				</div>
			</div>
		</>
	);
}
