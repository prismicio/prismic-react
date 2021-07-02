import * as React from "react";
import * as prismicT from "@prismicio/types";

import { __PRODUCTION__ } from "./dev";

/**
 * The minimum required properties to represent a Prismic Slice for the `<SliceZone>` component.
 *
 * If using Prismic's REST API, use the `Slice` export from `@prismicio/types` for a full interface.
 *
 * @typeParam SliceType - Type name of the Slice.
 */
export type SliceLike<SliceType extends string = string> = Pick<
	prismicT.Slice<SliceType>,
	"slice_type"
>;

/**
 * A looser version of the `SliceZone` type from `@prismicio/types` using `SliceLike`.
 *
 * If using Prismic's REST API, use the `SliceZone` export from `@prismicio/types` for the full type.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 */
export type SliceZoneLike<TSlice extends SliceLike> = readonly TSlice[];

/**
 * React props for a component rendering content from a Prismic Slice using the `<SliceZone>` component.
 *
 * @typeParam TSlice - The Slice passed as a prop.
 * @typeParam TContext - Arbitrary data passed to `<SliceZone>` and made available to all Slice components.
 */
export type SliceComponentProps<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> = {
	/** Slice data for this component. */
	slice: TSlice;

	/** The index of the Slice in the Slice Zone. */
	index: number;

	/** The Slice Zone to which the Slice belongs. */
	slices: SliceZoneLike<TSlice>;

	/** Arbitrary data passed to `<SliceZone>` and made available to all Slice components. */
	context?: TContext;
};

/**
 * React props for the `<SliceZone>` component.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 * @typeParam TContext - Arbitrary data made available to all Slice components.
 */
export type SliceZoneProps<TSlice extends SliceLike, TContext> = {
	/** List of Slice data from the Slice Zone. */
	slices: SliceZoneLike<TSlice>;

	/** A record mapping Slice types to React components. */
	components: Partial<
		Record<TSlice["slice_type"], React.ComponentType<SliceComponentProps>>
	>;

	/** The React component rendered if a component mapping from the `components` prop cannot be found. */
	defaultComponent?: React.ComponentType<SliceComponentProps>;

	/** Arbitrary data made available to all Slice components. */
	context?: TContext;
};

/**
 * The default React component rendered when a component mapping cannot be found in `<SliceZone>`.
 */
export const MissingSliceComponent = __PRODUCTION__
	? () => null
	: ({ slice }: SliceComponentProps): JSX.Element | null => {
			React.useEffect(() => {
				console.warn(
					`[SliceZone] Could not find a component Slice type "${slice.slice_type}"`,
					slice,
				);
			}, [slice]);

			return (
				<section
					data-slice-zone-mising-component=""
					data-slice-type={slice.slice_type}
				>
					Could not find a component for Slice type &ldquo;{slice.slice_type}
					&rdquo;
				</section>
			);
	  };

/**
 * Renders content from a Prismic Slice Zone using React components for each type of Slice.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 * @typeParam TContext - Arbitrary data made available to all Slice components.
 */
export const SliceZone = <TSlice extends SliceLike, TContext>({
	slices,
	components,
	defaultComponent = MissingSliceComponent,
	context,
}: SliceZoneProps<TSlice, TContext>): JSX.Element => {
	const renderedSlices = React.useMemo(() => {
		return slices.map((slice, index) => {
			const Comp: React.ComponentType<SliceComponentProps> =
				components[slice.slice_type as keyof typeof components] ||
				defaultComponent;
			const key = JSON.stringify(slice);

			return (
				<Comp
					key={key}
					slice={slice}
					index={index}
					slices={slices}
					context={context}
				/>
			);
		});
	}, [components, context, defaultComponent, slices]);

	return <>{renderedSlices}</>;
};
