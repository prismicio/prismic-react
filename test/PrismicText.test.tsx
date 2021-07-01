import * as React from "react";
import test from "ava";
import { PrismicText } from "../src/PrismicText";
import field from "./__fixtures__/enRichText.json";
import { RichTextField } from "@prismicio/types";
import renderer, { act, ReactTestRenderer } from "react-test-renderer";

test("returns string when passed RichTextField", (t) => {
	let tree: ReactTestRenderer;
	act(() => {
		tree = renderer.create(<PrismicText field={field as RichTextField} />);
	});
	const json = tree!.toJSON();

	t.is(
		json,
		'This block has a line\nbreak just before the word "break" Text before with a multi-block span! Heading 1 bold text italic still bold normal Paragraph A paragraph with a nested label First ordered list item Second ordered list item Third ordered list item Bold and now italic but not anymore value in the last list item Paragraph First list item Second list item Third list item Paragraph A web link A document link A media link A non-image media link A paragraph with a nested document link Paragraph Paragraph',
	);
});
