# Missing Link properties

`<PrismicLink>` requires specific properties in the provided field or document to render properly. This requirement extends to [Link][link-fields], [Link to Media][link-fields], and [Content Relationship][link-fields] fields.

If the required properties are missing, `<PrismicLink>` will not render the link.

**Note**: When using Prismic's [Rest API][rest-api] (the default when using `@prismicio/client`), the required fields are automatically included. When using Prismic's [GraphQL API][graphql-api], you must include these fields in your query.

## Required Properties

### With the `field` prop

The following properties are requried when using the `field` prop with a Link, Link to Media, or Content Relationship field:

- `link_type` (or `_linkType` when using Prismic's [GraphQL API][graphql-api])
- `id`
- `url`
- `uid` (only if your website uses a [Link Resolver][link-resolver] that uses a document's UID field)

The following properties are not required, but are recommended:

- `target`

**Example**:

```tsx
<PrismicLink field={doc.data.linkField}>Click me</PrismicLink>
```

### With the `document` prop

The following properties are requried when using the `document` prop with a Prismic document:

- `id`
- `url`
- `uid` (only if your website uses a [Link Resolver][link-resolver] that uses a document's UID field)

**Example**:

```tsx
<PrismicLink document={doc}>Click me</PrismicLink>
```

## GraphQL Example

When using Prismic's [GraphQL API][graphql-api], Link fields must be queried with at least the following properties:

```diff
  {
  	page(uid: "home", lang: "en-us") {
  		linkField {
+ 			_linkType
+ 			id
+ 			url
+ 			uid # only required if your website uses a Link Resolver that uses a document's UID field.
+ 			target # not required, but recommended for automatic `target` handling
  		}
  	}
  }
```

[link-fields]: https://prismic.io/docs/core-concepts/link-content-relationship
[link-resolver]: https://prismic.io/docs/core-concepts/link-resolver-route-resolver
[rest-api]: https://prismic.io/docs/technologies/rest-api-technical-reference
[graphql-api]: https://prismic.io/docs/technologies/graphql
