import { ComponentType } from "react";
import * as prismic from "@prismicio/client";

import { pascalCase, PascalCase } from "./lib/pascalCase";

/**
 * Returns the type of a `SliceLike` type.
 *
 * @typeParam Slice - The Slice from which the type will be extracted.
 */
type ExtractSliceType<TSlice extends SliceLike> = TSlice extends prismic.Slice
	? TSlice["slice_type"]
	: TSlice extends SliceLikeGraphQL
	? TSlice["type"]
	: never;

/**
 * The minimum required properties to represent a Prismic Slice from the Prismic
 * Rest API V2 for the `unstable_mapSliceZone()` helper.
 *
 * @typeParam SliceType - Type name of the Slice.
 */
export type SliceLikeRestV2<TSliceType extends string = string> = Pick<
	prismic.Slice<TSliceType>,
	"id" | "slice_type"
>;

/**
 * The minimum required properties to represent a Prismic Slice from the Prismic
 * GraphQL API for the `unstable_mapSliceZone()` helper.
 *
 * @typeParam SliceType - Type name of the Slice.
 */
export type SliceLikeGraphQL<TSliceType extends string = string> = {
	type: prismic.Slice<TSliceType>["slice_type"];
};

/**
 * The minimum required properties to represent a Prismic Slice for the
 * `unstable_mapSliceZone()` helper.
 *
 * If using Prismic's Rest API V2, use the `Slice` export from
 * `@prismicio/client` for a full interface.
 *
 * @typeParam SliceType - Type name of the Slice.
 */
export type SliceLike<TSliceType extends string = string> = (
	| SliceLikeRestV2<TSliceType>
	| SliceLikeGraphQL<TSliceType>
) & {
	/**
	 * If `true`, this Slice has been modified from its original value using a
	 * mapper and `@prismicio/client`'s `mapSliceZone()`.
	 *
	 * @internal
	 */
	__mapped?: true;
};

/**
 * A looser version of the `SliceZone` type from `@prismicio/client` using
 * `SliceLike`.
 *
 * If using Prismic's Rest API V2, use the `SliceZone` export from
 * `@prismicio/client` for the full type.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 */
export type SliceZoneLike<TSlice extends SliceLike = SliceLike> =
	readonly TSlice[];

/**
 * React props for a component rendering content from a Prismic Slice using the
 * `<SliceZone>` component.
 *
 * @typeParam TSlice - The Slice passed as a prop.
 * @typeParam TContext - Arbitrary data passed to `<SliceZone>` and made
 *   available to all Slice components.
 */
export type SliceComponentProps<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
	slices: SliceZoneLike<
		TSlice extends SliceLikeGraphQL ? SliceLikeGraphQL : SliceLikeRestV2
	>;

	/**
	 * Arbitrary data passed to `<SliceZone>` and made available to all Slice
	 * components.
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TSlice extends SliceLike = any,
	TContext = unknown,
> = React.ComponentType<SliceComponentProps<TSlice, TContext>>;

/**
 * A record of Slice types mapped to a React component. The component will be
 * rendered for each instance of its Slice.
 *
 * @deprecated This type is no longer used by `@prismicio/react`. Prefer using
 *   `Record<string, SliceComponentType<any>>` instead.
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
		[SliceType in ExtractSliceType<TSlice>]: SliceComponentType<
			Extract<TSlice, SliceLike<SliceType>> extends never
				? SliceLike
				: Extract<TSlice, SliceLike<SliceType>>,
			TContext
		>;
	};

/**
 * Arguments for a `<SliceZone>` `resolver` function.
 */
type SliceZoneResolverArgs<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TSlice extends SliceLike = any,
> = {
	/**
	 * The Slice to resolve to a React component.
	 */
	slice: TSlice;

	/**
	 * The name of the Slice.
	 */
	sliceName: PascalCase<ExtractSliceType<TSlice>>;

	/**
	 * The index of the Slice in the Slice Zone.
	 */
	i: number;
};

/**
 * A function that determines the rendered React component for each Slice in the
 * Slice Zone. If a nullish value is returned, the component will fallback to
 * the `components` or `defaultComponent` props to determine the rendered
 * component.
 *
 * @deprecated Use the `components` prop instead.
 *
 * @param args - Arguments for the resolver function.
 *
 * @returns The React component to render for a Slice.
 */
export type SliceZoneResolver<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TSlice extends SliceLike = any,
> = (
	args: SliceZoneResolverArgs<TSlice>,
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
ComponentType<any> | undefined | null;

/**
 * React props for the `<SliceZone>` component.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 * @typeParam TContext - Arbitrary data made available to all Slice components.
 */
export type SliceZoneProps<TContext = unknown> = {
	/**
	 * List of Slice data from the Slice Zone.
	 */
	slices?: SliceZoneLike;

	/**
	 * A record mapping Slice types to React components.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	components?: Record<string, ComponentType<any>>;

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	resolver?: SliceZoneResolver<any>;

	/**
	 * The React component rendered if a component mapping from the `components`
	 * prop cannot be found.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultComponent?: ComponentType<SliceComponentProps<any, TContext>>;

	/**
	 * Arbitrary data made available to all Slice components.
	 */
	context?: TContext;
};

/**
 * This Slice component can be used as a reminder to provide a proper
 * implementation.
 *
 * This is also the default React component rendered when a component mapping
 * cannot be found in `<SliceZone>`.
 */
export const TODOSliceComponent = <TSlice extends SliceLike>({
	slice,
}: {
	slice: TSlice;
}): JSX.Element | null => {
	if (
		typeof process !== "undefined" &&
		process.env.NODE_ENV === "development"
	) {
		const type = "slice_type" in slice ? slice.slice_type : slice.type;

		console.warn(
			`[SliceZone] Could not find a component for Slice type "${type}"`,
			slice,
		);

		return (
			<section data-slice-zone-todo-component="" data-slice-type={type}>
				Could not find a component for Slice type &ldquo;{type}
				&rdquo;
			</section>
		);
	} else {
		return null;
	}
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
export function SliceZone<TContext>({
	slices = [],
	components = {},
	resolver,
	defaultComponent,
	context = {} as TContext,
}: SliceZoneProps<TContext>) {
	// TODO: Remove in v3 when the `resolver` prop is removed.
	if (process.env.NODE_ENV === "development") {
		if (resolver) {
			console.warn(
				"The `resolver` prop is deprecated. Please replace it with a components map using the `components` prop.",
			);
		}
	}

	const renderedSlices = slices.map((slice, index) => {
		const type = "slice_type" in slice ? slice.slice_type : slice.type;

		let Comp = components[type as keyof typeof components] || defaultComponent;

		// TODO: Remove `resolver` in v3 in favor of `components`.
		if (resolver) {
			const resolvedComp = resolver({
				slice,
				sliceName: pascalCase(type),
				i: index,
			});

			if (resolvedComp) {
				Comp = resolvedComp as typeof Comp;
			}
		}

		const key =
			"id" in slice && slice.id
				? slice.id
				: `${index}-${JSON.stringify(slice)}`;

		if (Comp) {
			if (slice.__mapped) {
				const { __mapped, ...mappedProps } = slice;

				return <Comp key={key} {...mappedProps} />;
			} else {
				return (
					<Comp
						key={key}
						slice={slice}
						index={index}
						slices={slices}
						context={context}
					/>
				);
			}
		} else {
			return <TODOSliceComponent key={key} slice={slice} />;
		}
	});

	return <>{renderedSlices}</>;
}
