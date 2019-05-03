const PrismicHelpers = require('prismic-helpers');
const PrismicRichText = require('prismic-richtext');
const RichText = require('./richtext');

module.exports = {
  Date: PrismicHelpers.Date,
  Elements: PrismicRichText.Elements,
  Link: PrismicHelpers.Link,
  RichText: RichText.default,
};
