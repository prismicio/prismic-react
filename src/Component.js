import React, { Fragment } from 'react';
import { isValidElementType } from 'react-is';
import { func } from 'prop-types';

import { Elements } from 'prismic-richtext';
import { renderRichText, asText } from './richtext';

import { componentPropType, richTextPropTypes } from './utils';

const createHtmlSerializer = (bucket = {}, serializers = []) => {
  const processors = serializers.reduce((acc, { type, fn }) => {
    return Object.assign({}, acc, { [type]: fn })
  }, {});
  return (type, ...args) => processors[type] ? processors[type](type, ...args) : null;
}

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
    createHtmlSerializer({}, [{
      type: Elements.hyperlink,
      fn: serializeHyperlink
    }])
  );

  return render ?
    renderRichText(render, linkResolver, maybeSerializer, Component)
    : asText(renderAsText);
}

RichText.propTypes = {
  Component: componentPropType,
  linkResolver: func,
  htmlSerializer: func,
  serializeHyperlink: (props, _, componentName) => {
    if (props.serializeHyperlink && props.htmlSerializer) {
      return new Error(`You cannot specify both 'htmlSerializer' and 'serializeHyperlink'. The latter will be ignored by '${componentName}'.`);
    }
  },
  render: (props, _, componentName) => {
    if (!props.render && !props.renderAsText) {
      return new Error(`One of props 'render' or 'renderAsText' was not specified in '${componentName}'.`);
    }
  },
  renderAsText: (props, _, componentName) => {
    if (!props.renderAsText && !props.render) {
      return new Error(`One of props 'render' or 'renderAsText' was not specified in '${componentName}'.`);
    }
  },
};

RichText.asText = asText;
RichText.render = renderRichText;
RichText.displayName = 'RichText';

export default RichText;
