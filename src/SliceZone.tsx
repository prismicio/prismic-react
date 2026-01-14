import type { ComponentType, FC, ReactNode } from "react";
import type { Slice } from "@prismicio/client";
import { DEV } from "esm-env";

/**
 * Returns the type of a `SliceLike` type.
 *
 * @typeParam TSlice - The slice from which the type will be extracted.
 */
type ExtractSliceType<TSlice extends SliceLike> = TSlice extends Slice
	? TSlice["slice_type"]
	: TSlice extends SliceLikeGraphQL
		? TSlice["type"]
		: never;

/**
 * The minimum required properties to represent a Prismic slice from the Prismic
 * Content API for the `mapSliceZone()` helper.
 *
 * @typeParam SliceType - Type name of the slice.
 */
export type SliceLikeRestV2<TSliceType extends string = string> = Pick<
	Slice<TSliceType>,
	"id" | "slice_type"
>;

/**
 * The minimum required properties to represent a Prismic slice from the Prismic
 * GraphQL API for the `mapSliceZone()` helper.
 *
 * @typeParam SliceType - Type name of the slice.
 */
export type SliceLikeGraphQL<TSliceType extends string = string> = {
	type: Slice<TSliceType>["slice_type"];
};

/**
 * The minimum required properties to represent a Prismic slice for the
 * `mapSliceZone()` helper.
 *
 * If using Prismic's Content API, use the `Slice` export from
 * `@prismicio/client` for a full interface.
 *
 * @typeParam SliceType - Type name of the slice.
 */
export type SliceLike<TSliceType extends string = string> = (
	| SliceLikeRestV2<TSliceType>
	| SliceLikeGraphQL<TSliceType>
) & {
	/**
	 * If `true`, this slice has been modified from its original value using a
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
 * If using Prismic's Content API, use the `SliceZone` export from
 * `@prismicio/client` for the full type.
 *
 * @typeParam TSlice - The type(s) of a slice in the slice zone.
 */
export type SliceZoneLike<TSlice extends SliceLike = SliceLike> =
	readonly TSlice[];

/**
 * React props for a component rendering content from a Prismic slice using the
 * `<SliceZone>` component.
 *
 * @typeParam TSlice - The slice passed as a prop.
 * @typeParam TContext - Arbitrary data passed to `<SliceZone>` and made
 *   available to all slice components.
 */
export type SliceComponentProps<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> = {
	/** Slice data for this component. */
	slice: TSlice;

	/** The index of the slice in the slice zone. */
	index: number;

	/** All slices from the slice zone to which the slice belongs. */
	// TODO: We have to keep this list of slices general due to circular
	// reference limtiations. If we had another generic to determine the full
	// union of slice types, it would include TSlice. This causes TypeScript to
	// throw a compilation error.
	slices: SliceZoneLike<
		TSlice extends SliceLikeGraphQL ? SliceLikeGraphQL : SliceLikeRestV2
	>;

	/**
	 * Arbitrary data passed to `<SliceZone>` and made available to all slice
	 * components.
	 */
	context: TContext;
};

/**
 * A React component to be rendered for each instance of its slice.
 *
 * @typeParam TSlice - The type(s) of a slice in the slice zone.
 * @typeParam TContext - Arbitrary data made available to all slice components.
 */
export type SliceComponentType<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TSlice extends SliceLike = any,
	TContext = unknown,
> = ComponentType<SliceComponentProps<TSlice, TContext>>;

/**
 * A record of slice types mapped to a React component. The component will be
 * rendered for each instance of its slice.
 *
 * @deprecated This type is no longer used by `@prismicio/react`. Prefer using
 *   `Record<string, SliceComponentType<any>>` instead.
 *
 * @typeParam TSlice - The type(s) of a slice in the slice zone.
 * @typeParam TContext - Arbitrary data made available to all slice components.
 */
export type SliceZoneComponents<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> =
	// This is purposely not wrapped in Partial to ensure a component is provided
	// for all slice types. <SliceZone> will render a default component if one is
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
 * React props for the `<SliceZone>` component.
 *
 * @typeParam TSlice - The type(s) of a slice in the slice zone.
 * @typeParam TContext - Arbitrary data made available to all slice components.
 */
export type SliceZoneProps<TContext = unknown> = {
	/** List of slice data from the slice zone. */
	slices?: SliceZoneLike;

	/** A record mapping slice types to React components. */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	components?: Record<string, ComponentType<any>>;

	/**
	 * The React component rendered if a component mapping from the `components`
	 * prop cannot be found.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultComponent?: ComponentType<SliceComponentProps<any, TContext>>;

	/** Arbitrary data made available to all slice components. */
	context?: TContext;
};

/**
 * This slice component can be used as a reminder to provide a proper
 * implementation.
 *
 * This is also the default React component rendered when a component mapping
 * cannot be found in `<SliceZone>`.
 */
export const TODOSliceComponent = <TSlice extends SliceLike>({
	slice,
}: {
	slice: TSlice;
}): ReactNode => {
	if (!DEV) {
		return null;
	}

	const type = "slice_type" in slice ? slice.slice_type : slice.type;

	console.warn(
		`[SliceZone] Could not find a component for slice type "${type}"`,
		slice,
	);

	return (
		<section data-slice-zone-todo-component="" data-slice-type={type}>
			Could not find a component for slice type &ldquo;{type}
			&rdquo;
		</section>
	);
};

/**
 * Renders slices in a slice zone as React components.
 *
 * @example
 *
 * ```tsx
 * <SliceZone slices={page.data.slices} components={components} />;
 * ```
 *
 * @see Learn how to create slices, use slice variations, and display slices: {@link https://prismic.io/docs/slices}
 */
export const SliceZone: FC<SliceZoneProps> = (props) => {
	const {
		slices = [],
		components = {},
		defaultComponent,
		context = {},
	} = props;

	const renderedSlices = slices.map((slice, index) => {
		const type = "slice_type" in slice ? slice.slice_type : slice.type;

		const key =
			"id" in slice && slice.id
				? slice.id
				: `${index}-${JSON.stringify(slice)}`;

		const Comp =
			components[type as keyof typeof components] || defaultComponent;

		if (!Comp) {
			return <TODOSliceComponent key={key} slice={slice} />;
		}

		if (slice.__mapped) {
			const { __mapped, ...mappedProps } = slice;

			return <Comp key={key} {...mappedProps} />;
		}

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

	return <>{renderedSlices}</>;
};
