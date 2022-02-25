import * as React from "react";
import * as prismicH from "@prismicio/helpers";
import * as prismicT from "@prismicio/types";
import { SliceZone, PrismicRichText, PrismicLink } from "@prismicio/react";

// Documents can be typed using `@prismicio/types`
type PageDocument = prismicT.PrismicDocumentWithUID<{
	title: prismicT.TitleField;
	meta_description: prismicT.RichTextField;
	related_links: prismicT.GroupField<{
		link: prismicT.LinkField;
	}>;

	// Each Slice in a Slice Zone can be typed using `prismicT.Slice`
	slices: prismicT.SliceZone<
		| prismicT.Slice<
				// Slice type
				"hero",
				// Primary/non-repeatable fields
				{
					heading: prismicT.TitleField;
					body: prismicT.RichTextField;
				},
				// Item/repeatable fields
				{
					buttonText: prismicT.KeyTextField;
					buttonLink: prismicT.LinkField;
				}
		  >
		| prismicT.Slice<
				// Slice type
				"call_to_action",
				// Primary/non-repeatable fields
				{
					text: prismicT.RichTextField;
				},
				// Item/repeatable fields
				{
					buttonText: prismicT.KeyTextField;
					buttonLink: prismicT.LinkField;
				}
		  >
	>;
}>;

// Let's assume we have a full document from the Prismic Rest API V2.
//
// We use the `declare` keyword to tell TypeScript that the const is that type
// without needing to type it out for this example.
//
// In your real project, this would come from the API via `@prismicio/client`.
declare const page: PageDocument;

// Components from `@prismicio/react` will work with this type to ensure the
// correct fields are passed.

// Rendering a Rich Text or Title looks like this.
export const WithRichText = (): JSX.Element => {
	return <PrismicRichText field={page.data.title} />;
};

// Rendering a link to a document looks like this.
export const WithDocumentLink = (): JSX.Element => {
	return <PrismicLink document={page} />;
};

// Rendering a group looks like this.
// Using `isFilled.group()` and `isFilled.link()` from `@prismicio/helpers`
// checks if the fields have a value.
export const WithGroupFieldLink = (): JSX.Element => {
	return (
		<ul>
			{prismicH.isFilled.group(page.data.related_links) &&
				page.data.related_links.map(
					(item) =>
						prismicH.isFilled.link(item.link) && (
							<li
								key={
									item.link.link_type === prismicT.LinkType.Document
										? item.link.id
										: item.link.url
								}
							>
								<PrismicLink field={item.link}>{item}</PrismicLink>
							</li>
						),
				)}
		</ul>
	);
};

// Rendering a Slice Zone looks like this.
// Note that the `components` object is typed to ensure a component is given
// for each Slice type.
export const WithSliceZone = (): JSX.Element => {
	return (
		<SliceZone
			slices={page.data.slices}
			components={{
				hero: () => <div>Hero Slice</div>,
				call_to_action: () => <div>Call to Action Slice</div>,
			}}
		/>
	);
};
