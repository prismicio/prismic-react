import * as React from "react";
import * as prismicT from "@prismicio/types";

import { __PRODUCTION__ } from "./lib/__PRODUCTION__";

/**
 * The minimum required properties to represent a Prismic Slice for the
 * `<SliceZone>` component.
 *
 * If using Prismic's REST API, use the `Slice` export from `@prismicio/types`
 * for a full interface.
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
 * If using Prismic's REST API, use the `SliceZone` export from
 * `@prismicio/types` for the full type.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 */
export type SliceZoneLike<TSlice extends SliceLike> = readonly TSlice[];

/**
 * React props for a component rendering content from a Prismic Slice using the
 * `<SliceZone>` component.
 *
 * @typeParam TSlice - The Slice passed as a prop.
 * @typeParam TContext - Arbitrary data passed to `<SliceZone>` and made
 *   available to all Slice components.
 */
export type SliceComponentProps<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> = {
	/**
	 * Slice data for this component.
	 */
	slice: TSlice;

	/**
	 * The index of the Slice in the Slice Zone.
	 */
	index: number;

	/**
	 * All Slices from the Slice Zone to which the Slice belongs.
	 */
	// TODO: We have to keep this list of Slices general due to circular
	// reference limtiations. If we had another generic to determine the full
	// union of Slice types, it would include TSlice. This causes TypeScript to
	// throw a compilation error.
	slices: SliceZoneLike<SliceLike>;

	/**
	 * Arbitrary data passed to `<SliceZone>` and made available to all Slice components.
	 */
	context: TContext;
};

/**
 * A React component to be rendered for each instance of its Slice.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 * @typeParam TContext - Arbitrary data made available to all Slice components.
 */
export type SliceComponentType<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> = React.ComponentType<SliceComponentProps<TSlice, TContext>>;

/**
 * A record of Slice types mapped to a React component. The component will be
 * rendered for each instance of its Slice.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 * @typeParam TContext - Arbitrary data made available to all Slice components.
 */
export type SliceZoneComponents<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> =
	// This is purposely not wrapped in Partial to ensure a component is provided
	// for all Slice types. <SliceZone> will render a default component if one is
	// not provided, but it *should* be a type error if an explicit component is
	// missing.
	//
	// If a developer purposely does not want to provide a component, they can
	// assign it to the TODOSliceComponent exported from this package. This
	// signals to future developers that it is a placeholder and should be
	// implemented.
	{
		[SliceType in keyof Record<
			TSlice["slice_type"],
			never
		>]: SliceComponentType<
			Extract<TSlice, SliceLike<SliceType>> extends never
				? SliceLike
				: Extract<TSlice, SliceLike<SliceType>>,
			TContext
		>;
	};

/**
 * This Slice component can be used as a reminder to provide a proper implementation.
 *
 * This is also the default React component rendered when a component mapping
 * cannot be found in `<SliceZone>`.
 */
export const TODOSliceComponent = __PRODUCTION__
	? () => null
	: <TSlice extends SliceLike, TContext>({
			slice,
	  }: SliceComponentProps<TSlice, TContext>): JSX.Element | null => {
			React.useEffect(() => {
				console.warn(
					`[SliceZone] Could not find a component for Slice type "${slice.slice_type}"`,
					slice,
				);
			}, [slice]);

			return (
				<section
					data-slice-zone-todo-component=""
					data-slice-type={slice.slice_type}
				>
					Could not find a component for Slice type &ldquo;{slice.slice_type}
					&rdquo;
				</section>
			);
	  };

/**
 * Arguments for a `<SliceZone>` `resolver` function.
 */
type SliceZoneResolverArgs<TSlice extends SliceLike = SliceLike> = {
	/**
	 * The Slice to resolve to a React component.
	 */
	slice: TSlice;

	/**
	 * The name of the Slice.
	 */
	sliceName: TSlice["slice_type"];

	/**
	 * The index of the Slice in the Slice Zone.
	 */
	i: number;
};

/**
 * A function that determines the rendered React component for each Slice in the
 * Slice Zone. If a nullish value is returned, the component will fallback to
 * the `components` or `defaultComponent` props to determine the rendered component.
 *
 * @deprecated Use the `components` prop instead.
 *
 * @param args - Arguments for the resolver function.
 *
 * @returns The React component to render for a Slice.
 */
export type SliceZoneResolver<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> = (
	args: SliceZoneResolverArgs<TSlice>,
) => SliceComponentType<TSlice, TContext> | undefined | null;

/**
 * React props for the `<SliceZone>` component.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 * @typeParam TContext - Arbitrary data made available to all Slice components.
 */
export type SliceZoneProps<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> = {
	/**
	 * List of Slice data from the Slice Zone.
	 */
	slices?: SliceZoneLike<TSlice>;

	/**
	 * A record mapping Slice types to React components.
	 */
	components?: SliceZoneComponents<TSlice, TContext>;

	/**
	 * A function that determines the rendered React component for each Slice in
	 * the Slice Zone.
	 *
	 * @deprecated Use the `components` prop instead.
	 *
	 * @param args - Arguments for the resolver function.
	 *
	 * @returns The React component to render for a Slice.
	 */
	resolver?: SliceZoneResolver<TSlice, TContext>;

	/**
	 * The React component rendered if a component mapping from the `components`
	 * prop cannot be found.
	 */
	defaultComponent?: SliceComponentType<TSlice, TContext>;

	/**
	 * Arbitrary data made available to all Slice components.
	 */
	context?: TContext;
};

/**
 * Renders content from a Prismic Slice Zone using React components for each
 * type of Slice.
 *
 * If a component is not provided for a type of Slice, a default component can
 * be provided. A fallback component is provided by default that will not be
 * rendered in a production build of your app.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 * @typeParam TContext - Arbitrary data made available to all Slice components.
 *
 * @returns The Slice Zone's content as React components.
 *
 * @see Learn about Prismic Slices and Slice Zones {@link https://prismic.io/docs/core-concepts/slices}
 */
export const SliceZone = <TSlice extends SliceLike, TContext>({
	slices = [],
	components = {} as SliceZoneComponents<TSlice, TContext>,
	resolver,
	defaultComponent = TODOSliceComponent,
	context = {} as TContext,
}: SliceZoneProps<TSlice, TContext>): JSX.Element => {
	const renderedSlices = React.useMemo(() => {
		return slices.map((slice, index) => {
			let Comp = (components[slice.slice_type as keyof typeof components] ||
				defaultComponent) as SliceComponentType<TSlice, TContext>;

			// TODO: Remove `resolver` in v3 in favor of `components`.
			if (resolver) {
				const resolvedComp = resolver({
					slice,
					sliceName: slice.slice_type,
					i: index,
				});

				if (resolvedComp) {
					Comp = resolvedComp;
				}
			}

			const key = `${index}-${JSON.stringify(slice)}`;

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
