import React, { Fragment } from 'react';
import { func } from 'prop-types';
import { isValidElementType } from 'react-is';
import PrismicHelpers from 'prismic-helpers';
import { renderRichText, asText } from "./richtext";

const renderWarning = 'RichText.render: Method deprecated, use RichText component instead!';
const asTextWarning = 'RichText.asText: Method deprecated, use RichText component instead!';

const RichText = (props) => {
  const {
    Component,
    htmlSerializer,
    linkResolver,
    render,
    renderAsText,
  }  = props;

  if (!render && !renderAsText) {
    return null;
  }
  return render ?
    renderRichText(render, linkResolver, htmlSerializer, Component)
    : asText(renderAsText);
}

const componentPropType = (props, propName) => {
  if (props[propName] && !isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop 'Component' supplied: the prop is not a valid React component`
    );
  }
  return null;
}

RichText.propTypes = {
  Component: componentPropType,
  linkResolver: func,
  htmlSerializer: func,
  render: (props, _, componentName) => {
    if (!props.render && !props.renderAsText) {
      return new Error(`One of props 'render' or 'renderAsText' was not specified in '${componentName}'.`);
    }
  },
  renderAsText: (props, _, componentName) => {
    if (!props.renderAsText && !props.render) {
      return new Error(`One of props 'render' or 'renderAsText' was not specified in '${componentName}'.`);
    }
  }
}

RichText.displayName = 'RichText';

module.exports = {
  Date: PrismicHelpers.Date,
  RichText,
  render: (...args) => console.warn(renderWarning) || renderRichText(...args),
  asText: (...args) => console.warn(asTextWarning) || asText(...args),
  Link: PrismicHelpers.Link
};
