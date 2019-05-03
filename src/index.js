const PrismicHelpers = require('prismic-helpers');
const RichText = require('./richtext');

module.exports = {
  Date: PrismicHelpers.Date,
  Elements: PrismicHelpers.Elements,
  Link: PrismicHelpers.Link,
  RichText: RichText.default,
};
