const PrismicHelpers = require('prismic-helpers');
const PrismicRichText = require('prismic-richtext');
const Component = require('./Component');

console.warn('dev')
module.exports = {
  Date: PrismicHelpers.Date,
  Elements: PrismicRichText.Elements,
  Link: PrismicHelpers.Link,
  RichText: Component.default
}
