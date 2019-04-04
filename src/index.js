import React, { Fragment } from 'react';
import { Elements } from 'prismic-richtext';
import PrismicHelpers from 'prismic-helpers';
import { renderRichText, asText } from './richtext';

import {
  asTextWarning,
  componentPropType,
  createHtmlSerializer,
  renderWarning,
  richTextPropTypes,
} from './utils';

const RichText = (props) => {
  const {
    Component,
    htmlSerializer,
    linkResolver,
    render,
    renderAsText,
    serializeHyperlink,
  }  = props;

  if (!render && !renderAsText) {
    return null;
  }

  let maybeSerializer;

  if (htmlSerializer) {
    maybeSerializer = htmlSerializer;
  } else if (serializeHyperlink) {
    let bucket = {};
    maybeSerializer = createHtmlSerializer(bucket, [{
      type: Elements.hyperlink,
      fn: serializeHyperlink
    }]);
  }

  return render ?
    renderRichText(render, linkResolver, maybeSerializer, Component)
    : asText(renderAsText);
}

RichText.propTypes = richTextPropTypes;
RichText.displayName = 'RichText';

module.exports = {
  asText: (...args) => console.warn(asTextWarning) || asText(...args),
  Date: PrismicHelpers.Date,
  Link: PrismicHelpers.Link,
  render: (...args) => console.warn(renderWarning) || renderRichText(...args),
  RichText,
};
