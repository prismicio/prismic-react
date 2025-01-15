// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Content for Image Test documents
 */
interface ImageTestDocumentData {
	/**
	 * Empty field in *Image Test*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_test.empty
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	empty: prismic.ImageField<never>;
	
	/**
	 * Filled field in *Image Test*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_test.filled
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	filled: prismic.ImageField<never>;
	
	/**
	 * With Alt Text field in *Image Test*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_test.with_alt_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	with_alt_text: prismic.ImageField<never>;
	
	/**
	 * Without Alt Text field in *Image Test*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_test.without_alt_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	without_alt_text: prismic.ImageField<never>;
	
	/**
	 * With Crop field in *Image Test*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_test.with_crop
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	with_crop: prismic.ImageField<never>;
	
	/**
	 * With Thumbnails field in *Image Test*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_test.with_thumbnails
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	with_thumbnails: prismic.ImageField<"foo" | "bar">;
}

/**
 * Image Test document from Prismic
 *
 * - **API ID**: `image_test`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ImageTestDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ImageTestDocumentData>, "image_test", Lang>;

/**
 * Content for Link Test documents
 */
interface LinkTestDocumentData {
	/**
	 * Empty field in *Link Test*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_test.empty
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	empty: prismic.LinkField;
	
	/**
	 * Internal Web field in *Link Test*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_test.internal_web
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	internal_web: prismic.LinkField;
	
	/**
	 * External Web field in *Link Test*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_test.external_web
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	external_web: prismic.LinkField;
	
	/**
	 * External Web With Target field in *Link Test*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_test.external_web_with_target
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	external_web_with_target: prismic.LinkField;
	
	/**
	 * Document field in *Link Test*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_test.document
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	document: prismic.LinkField;
	
	/**
	 * Media field in *Link Test*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_test.media
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	media: prismic.LinkField;
	
	/**
	 * With Text field in *Link Test*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_test.with_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	with_text: prismic.LinkField;
}

/**
 * Link Test document from Prismic
 *
 * - **API ID**: `link_test`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LinkTestDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<LinkTestDocumentData>, "link_test", Lang>;

type PageDocumentDataFilledSlice = TextSlice | ImageSlice

type PageDocumentDataEmptySlice = TextSlice | ImageSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.filled[]
	 * - **Tab**: Filled
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	filled: prismic.SliceZone<PageDocumentDataFilledSlice>;/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.empty[]
	 * - **Tab**: Empty
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	empty: prismic.SliceZone<PageDocumentDataEmptySlice>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Content for Rich Text Test documents
 */
interface RichTextTestDocumentData {
	/**
	 * Empty field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.empty
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	empty: prismic.RichTextField;
	
	/**
	 * Filled field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.filled
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	filled: prismic.RichTextField;
	
	/**
	 * Key Text field in *Rich Text Test*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.keytext
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	keytext: prismic.KeyTextField;
	
	/**
	 * Select field in *Rich Text Test*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.select
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#select
	 */
	select: prismic.SelectField<"foo">;
	
	/**
	 * Heading 1 field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.heading1
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	heading1: prismic.RichTextField;
	
	/**
	 * Heading 2 field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.heading2
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	heading2: prismic.RichTextField;
	
	/**
	 * Heading 3 field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.heading3
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	heading3: prismic.RichTextField;
	
	/**
	 * Heading 4 field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.heading4
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	heading4: prismic.RichTextField;
	
	/**
	 * Heading 5 field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.heading5
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	heading5: prismic.RichTextField;
	
	/**
	 * Heading 6 field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.heading6
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	heading6: prismic.RichTextField;
	
	/**
	 * Paragraph field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.paragraph
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	paragraph: prismic.RichTextField;
	
	/**
	 * Preformatted field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.preformatted
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	preformatted: prismic.RichTextField;
	
	/**
	 * Strong field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.strong
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	strong: prismic.RichTextField;
	
	/**
	 * Em field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.em
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	em: prismic.RichTextField;
	
	/**
	 * List field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.list
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	list: prismic.RichTextField;
	
	/**
	 * Ordered List field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.ordered_list
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	ordered_list: prismic.RichTextField;
	
	/**
	 * Image field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	image: prismic.RichTextField;
	
	/**
	 * Embed field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.embed
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	embed: prismic.RichTextField;
	
	/**
	 * Hyperlink Internal field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.hyperlink_internal
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	hyperlink_internal: prismic.RichTextField;
	
	/**
	 * Hyperlink External field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.hyperlink_external
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	hyperlink_external: prismic.RichTextField;
	
	/**
	 * Label field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	label: prismic.RichTextField;
	
	/**
	 * RTL field in *Rich Text Test*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text_test.rtl
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	rtl: prismic.RichTextField;
}

/**
 * Rich Text Test document from Prismic
 *
 * - **API ID**: `rich_text_test`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RichTextTestDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<RichTextTestDocumentData>, "rich_text_test", Lang>;

export type AllDocumentTypes = ImageTestDocument | LinkTestDocument | PageDocument | RichTextTestDocument;

/**
 * Primary content in *Image → Default → Primary*
 */
export interface ImageSliceDefaultPrimary {
	/**
	 * Image field in *Image → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image.default.primary.content
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	content: prismic.ImageField<never>;
}

/**
 * Default variation for Image Slice
 *
 * - **API ID**: `default`
 * - **Description**: Image
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ImageSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Image*
 */
type ImageSliceVariation = ImageSliceDefault

/**
 * Image Shared Slice
 *
 * - **API ID**: `image`
 * - **Description**: Image
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageSlice = prismic.SharedSlice<"image", ImageSliceVariation>;

/**
 * Primary content in *Text → Default → Primary*
 */
export interface TextSliceDefaultPrimary {
	/**
	 * Text field in *Text → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text.default.primary.content
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for Text Slice
 *
 * - **API ID**: `default`
 * - **Description**: Text
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TextSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Text*
 */
type TextSliceVariation = TextSliceDefault

/**
 * Text Shared Slice
 *
 * - **API ID**: `text`
 * - **Description**: Text
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TextSlice = prismic.SharedSlice<"text", TextSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			ImageTestDocument,
			ImageTestDocumentData,
			LinkTestDocument,
			LinkTestDocumentData,
			PageDocument,
			PageDocumentData,
			PageDocumentDataFilledSlice,
			PageDocumentDataEmptySlice,
			RichTextTestDocument,
			RichTextTestDocumentData,
			AllDocumentTypes,
			ImageSlice,
			ImageSliceDefaultPrimary,
			ImageSliceVariation,
			ImageSliceDefault,
			TextSlice,
			TextSliceDefaultPrimary,
			TextSliceVariation,
			TextSliceDefault
		}
	}
}