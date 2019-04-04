import React, { Fragment } from 'react';
import { func } from 'prop-types';
import { isValidElementType } from 'react-is';
import { Elements } from 'prismic-richtext';
import PrismicHelpers from 'prismic-helpers';
import { renderRichText, asText } from "./richtext";

const serializerProps = {
  serializeTag: [
    Elements.heading1,
    Elements.heading2,
    Elements.heading3,
    Elements.heading4,
    Elements.heading5,
    Elements.heading6,
    Elements.paragraph,
    Elements.preformatted,
    Elements.strong,
    Elements.em,
    Elements.listItem,
    Elements.oListItem,
    Elements.list,
    Elements.oList,
  ],
  serializeImage: [Elements.image],
  serializeEmbed: [Elements.embed],
  serializeHyperlink: [Elements.hyperlink],
  serializeLabel: [Elements.label],
  serializeSpan: [Elements.span],
}

const renderWarning = 'RichText.render: Method deprecated, use RichText component instead!';
const asTextWarning = 'RichText.asText: Method deprecated, use RichText component instead!';

let callbacks = {};

const addSerializer = (_case, fn) => {
   callbacks[_case] = fn;
}

const createHtmlSerializer = (serializers) => {
  serializers.forEach(({ type, fn }) => addSerializer(type, fn));
  return (type, ...args) => callbacks[type] ? callbacks[type](type, ...args) : null;
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

  if (htmlSerializer) {
    console.log(render)
  }

  let serializers = [];
  Object.keys(serializerProps).map(propName => {
    if (props[propName]) {
      serializerProps[propName].forEach(element => {
        console.log(element, 'here')
        serializers.push({ type: element, fn: props[propName] });
        // addSerializer(element, props[propName])
      })
    }
  })

  console.log(serializers, 'serializers');
  let maybeSerializer =
    htmlSerializer || createHtmlSerializer(serializers); // [{ type: Elements.hyperlink, fn: serializeHyperlink }]

  return render ?
    renderRichText(render, linkResolver, maybeSerializer, Component)
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
}

Object.keys(serializerProps).map(prop =>
  RichText.propTypes[prop] = (props, _, componentName) => {
    if (props[prop] && props.htmlSerializer) {
      return new Error(`You cannot specify both 'htmlSerializer' and '${prop}'. The latter will be ignored by '${componentName}'.`);
    }
  }
);

console.log(RichText.propTypes)

RichText.displayName = 'RichText';

module.exports = {
  Date: PrismicHelpers.Date,
  RichText,
  render: (...args) => console.warn(renderWarning) || renderRichText(...args),
  asText: (...args) => console.warn(asTextWarning) || asText(...args),
  Link: PrismicHelpers.Link
};
