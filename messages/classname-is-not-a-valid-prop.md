# `className` is not a valid prop

`<PrismicRichText>` and `<PrismicText>` do not accept a `className` prop. These components render an array of React components and do not have a wrapping element.

To add a `className` as a wrapper around the output of `<PrismicRichText>` or `<PrismicText>`, add a wrapper element with the `className`.

```tsx
// ✅ Correct
<div className="prose">
	<PrismicRichText field={doc.data.richTextField} />
</div>
```

```tsx
// ❌ Incorrect
<PrismicRichText field={doc.data.richTextField} className="prose" />
```

To add a `className` to a specific block type when using `<PrismicRichText>`, provide a custom component.

```tsx
<PrismicRichText
	field={doc.data.richTextField}
	components={{
		heading1: ({ children }) => (
			<h1 className="font-bold text-3xl">{children}</h1>
		),
	}}
/>
```
