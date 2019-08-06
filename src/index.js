require('es6-promise/auto');
require('es6-object-assign/auto');
require('core-js/es/map');
require('core-js/es/set');
const PrismicHelpers = require('prismic-helpers');
const PrismicRichText = require('prismic-richtext');
const Component = require('./Component');

module.exports = {
  Date: PrismicHelpers.Date,
  Elements: PrismicRichText.Elements,
  Link: PrismicHelpers.Link,
  RichText: Component.default,
}
