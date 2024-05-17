import * as prismic from "@prismicio/client";

export type HeroSlice = prismic.SharedSlice<
	"hero",
	prismic.SharedSliceVariation<
		"default",
		{
			heading: prismic.KeyTextField;
			buttonText: prismic.KeyTextField;
			cards: prismic.GroupField<{
				title: prismic.KeyTextField;
				content: prismic.KeyTextField;
			}>;
		}
	>
>;

export type CallToActionSlice = prismic.SharedSlice<
	"call_to_action",
	prismic.SharedSliceVariation<
		"default",
		{
			text: prismic.KeyTextField;
		}
	>
>;

export type Slices = HeroSlice | CallToActionSlice;

export type ExampleSliceZone = prismic.SliceZone<Slices>;
