import * as prismicT from "@prismicio/types";

export type HeroSlice = prismicT.Slice<
	"hero",
	{
		heading: prismicT.KeyTextField;
		buttonText: prismicT.KeyTextField;
	}
>;

export type CallToActionSlice = prismicT.Slice<
	"call_to_action",
	{
		text: prismicT.KeyTextField;
	}
>;

export type Slices = HeroSlice | CallToActionSlice;

export type ExampleSliceZone = prismicT.SliceZone<Slices>;
