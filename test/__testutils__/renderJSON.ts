import * as renderer from "react-test-renderer";

/**
 * Renders a JSON representation of a React.Element. This is a helper to reduce
 * boilerplate in each test.
 *
 * @param element - The React.Element to render.
 *
 * @returns The JSON representation of `element`.
 */
export const renderJSON = (
	element: React.ReactElement,
): renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null => {
	let root: renderer.ReactTestRenderer;

	renderer.act(() => {
		root = renderer.create(element);
	});

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return root!.toJSON();
};
