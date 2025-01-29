import * as React from "react";
import * as prismic from "@prismicio/client";
import { SliceZone, PrismicRichText, PrismicLink } from "@prismicio/react";

// Documents can be typed using `@prismicio/client`
type PageDocument = prismic.PrismicDocumentWithUID<{
	title: prismic.TitleField;
	meta_description: prismic.RichTextField;
	related_links: prismic.GroupField<{
		link: prismic.LinkField;
	}>;

	// Each Slice in a Slice Zone can be typed using `prismic.SharedSlice`
	slices: prismic.SliceZone<
		| prismic.SharedSlice<
				// Slice type
				"hero",
				prismic.SharedSliceVariation<
					"default",
					// Fields
					{
						heading: prismic.KeyTextField;
						body: prismic.RichTextField;
						buttons: prismic.GroupField<{
							link: prismic.LinkField;
						}>;
					}
				>
		  >
		| prismic.SharedSlice<
				// Slice type
				"call_to_action",
				prismic.SharedSliceVariation<
					"default",
					// Fields
					{
						text: prismic.RichTextField;
						buttons: prismic.GroupField<{
							link: prismic.LinkField;
						}>;
					}
				>
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
export const WithRichText = (): React.JSX.Element => {
	return <PrismicRichText field={page.data.title} />;
};

// Rendering a link to a document looks like this.
export const WithDocumentLink = (): React.JSX.Element => {
	return <PrismicLink document={page} />;
};

// Rendering a group looks like this.
// Using `isFilled.group()` and `isFilled.link()` from `@prismicio/helpers`
// checks if the fields have a value.
export const WithGroupFieldLink = (): React.JSX.Element => {
	return (
		<ul>
			{prismic.isFilled.group(page.data.related_links) &&
				page.data.related_links.map(
					(item) =>
						prismic.isFilled.link(item.link) && (
							<li
								key={
									item.link.link_type === prismic.LinkType.Document
										? item.link.id
										: item.link.url
								}
							>
								<PrismicLink field={item.link} />
							</li>
						),
				)}
		</ul>
	);
};

// Rendering a Slice Zone looks like this.
// Note that the `components` object is typed to ensure a component is given
// for each Slice type.
export const WithSliceZone = (): React.JSX.Element => {
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
