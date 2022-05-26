# `<PrismicText>` works only with Rich Text and Title fields

`<PrismicText>` works only with [Rich Text and Title fields][rich-text-title-field]. It renders the field's value as plain text (i.e. with no formatting, paragraphs, or headings).

```tsx
// Will render a plain text version of the Rich Text field's value.
<PrismicText field={doc.data.richTextField} />
```

Other text-based field types, such as [Key Text][key-text-field] and [Select][select-field], cannot be rendered using `<PrismicText>`.

Since Key Text and Select field values are already plain text, you can render them inline without a special component.

```tsx
// Will render the Key Text field's value.
<span>{doc.data.keyTextField}</span>

// Will render the Select field's value.
<span>{doc.data.selectField}</span>
```

[rich-text-title-field]: https://prismic.io/docs/core-concepts/rich-text-title
[key-text-field]: https://prismic.io/docs/core-concepts/key-text
[select-field]: https://prismic.io/docs/core-concepts/select
