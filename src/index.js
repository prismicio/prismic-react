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

  const maybeSerializer = htmlSerializer || (serializeHyperlink &&
    createHtmlSerializer(bucket, [{
      type: Elements.hyperlink,
      fn: serializeHyperlink
    }])
  );

  return render ?
    renderRichText(render, linkResolver, maybeSerializer, Component)
    : asText(renderAsText);
}

RichText.propTypes = richTextPropTypes;
RichText.displayName = 'RichText';

module.exports = {
  asText: asText,
  Date: PrismicHelpers.Date,
  Link: PrismicHelpers.Link,
  render: renderRichText,
  RichText,
};
