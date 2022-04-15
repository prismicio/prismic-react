# `alt` must be an empty string

`<PrismicImage>` allows the `alt` HTML attribute to be configured using two props: `alt` and `fallbackAlt`.

Both `alt` and `fallbackAlt` can only be used to [declare an image as decorative][mdn-alt-decorative-image] by pasing an empty string. You may not pass arbitrary alternative text to the `alt` prop.

```tsx
// Will render `alt` using the Image field's `alt` property.
<PrismicImage field={doc.data.imageField} />

// Will always render `alt=""`.
<PrismicImage field={doc.data.imageField} alt="" />

// Will render `alt=""` only if the Image field's alt property is empty.
<PrismicImage field={doc.data.imageField} fallbackAlt="" />
```

All images should have an alt value. `<PrismicImage>` will automatically use the Image field's `alt` property written in the Prismic Editor. If the Image field's `alt` property is empty, the `alt` HTML attribute will not be included _unless_ one of `alt` or `fallbackAlt` is used.

For more details on decorative images, [see the MDN article on the `<img>` HTML element's `alt` attribute][mdn-alt-decorative-image].

## Deciding between `alt=""` and `fallbackAlt=""`

`alt=""` will always mark the image as decorative, ignoring the provied Image field's `alt` property. Use this when the image is always used for decorative or presentational purposes.

`fallbackAlt=""` will only mark the image as decorative if the provided Image field's `alt` property is empty. Use this when you want to mark the image as decorative _unless_ alternative text is provided in the Prismic Editor. **Generally speaking, this is discouraged**; prefer marking the image as decorative intentionally.

[mdn-alt-decorative-image]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#decorative_images
