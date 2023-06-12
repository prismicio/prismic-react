import * as prismic from "@prismicio/client";

export type HeroSlice = prismic.Slice<
	"hero",
	{
		heading: prismic.KeyTextField;
		buttonText: prismic.KeyTextField;
	}
>;

export type CallToActionSlice = prismic.Slice<
	"call_to_action",
	{
		text: prismic.KeyTextField;
	}
>;

export type Slices = HeroSlice | CallToActionSlice;

export type ExampleSliceZone = prismic.SliceZone<Slices>;
