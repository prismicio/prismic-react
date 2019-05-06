import React, { Fragment } from 'react';
import PrismicRichText, { Elements } from 'prismic-richtext';
import { Link as LinkHelper } from 'prismic-helpers';
import { createScript, embeds } from './embeds';
import {
  componentError,
  richTextError,
  validateRichText,
  validateComponent,
} from './utils';

function serialize(linkResolver, type, element, content, children, index) {
  switch(type) {
    case Elements.heading1: return serializeStandardTag('h1', element, children, index);
    case Elements.heading2: return serializeStandardTag('h2', element, children, index);
    case Elements.heading3: return serializeStandardTag('h3', element, children, index);
    case Elements.heading4: return serializeStandardTag('h4', element, children, index);
    case Elements.heading5: return serializeStandardTag('h5', element, children, index);
    case Elements.heading6: return serializeStandardTag('h6', element, children, index);
    case Elements.paragraph: return serializeStandardTag('p', element, children, index);
    case Elements.preformatted: return serializeStandardTag('pre', element, children, index);
    case Elements.strong: return serializeStandardTag('strong', element, children, index);
    case Elements.em: return serializeStandardTag('em', element, children, index);
    case Elements.listItem: return serializeStandardTag('li', element, children, index);
    case Elements.oListItem: return serializeStandardTag('li', element, children, index);
    case Elements.list: return serializeStandardTag('ul', element, children, index);
    case Elements.oList: return serializeStandardTag('ol', element, children, index);
    case Elements.image: return serializeImage(linkResolver, element, index);
    case Elements.embed: return serializeEmbed(element, index);
    case Elements.hyperlink: return serializeHyperlink(linkResolver, element, children, index);
    case Elements.label: return serializeLabel(element, children, index);
    case Elements.span: return serializeSpan(content);
    default: return null;
  }
}

function propsWithUniqueKey(props = {}, key) {
  return Object.assign(props, { key });
}

function serializeStandardTag(tag, element, children, key) {
  const props = element.label ? Object.assign({}, {className: element.label}) : {};
  return React.createElement(tag, propsWithUniqueKey(props, key), children);
}

function serializeHyperlink(linkResolver, element, children, key) {
  const targetAttr = element.data.target ? { target: element.data.target } : {};
  const relAttr = element.data.target ? { rel: 'noopener' } : {};
  const props = Object.assign({ href: LinkHelper.url(element.data, linkResolver) }, targetAttr, relAttr);
  return React.createElement('a', propsWithUniqueKey(props, key), children);
}

function serializeLabel(element, children, key) {
  const props = element.data ? Object.assign({}, { className: element.data.label }) : {};
  return React.createElement('span', propsWithUniqueKey(props, key), children);
}

function serializeSpan(content) {
  if (content) {
    return content.split("\n").reduce((acc, p) => {
      if (acc.length === 0) {
        return [p];
      } else {
        const brIndex = (acc.length + 1)/2 - 1;
        const br = React.createElement('br', propsWithUniqueKey({}, brIndex));
        return acc.concat([br, p]);
      }
    }, []);
  } else {
    return null;
  }
}

function serializeImage(linkResolver, element, key) {
  const linkUrl = element.linkTo ? LinkHelper.url(element.linkTo, linkResolver) : null;
  const linkTarget = (element.linkTo && element.linkTo.target) ? { target: element.linkTo.target } : {};
  const relAttr = linkTarget.target ? { rel: 'noopener' } : {};
  const img = React.createElement('img', { src: element.url , alt: element.alt || '' });

  return React.createElement(
    'p',
    propsWithUniqueKey({ className: [element.label || '', 'block-img'].join(' ') }, key),
    linkUrl ? React.createElement('a', Object.assign({ href: linkUrl }, linkTarget, relAttr), img) : img
  );
}

function serializeEmbed(element, key) {
  if (embeds[element.oembed.provider_name]) {
    createScript(embeds[element.oembed.provider_name]);
  }

  const className = `embed embed-${element.oembed.provider_name.toLowerCase()}`
  const props = Object.assign({
    "data-oembed": element.oembed.embed_url,
    "data-oembed-type": element.oembed.type,
    "data-oembed-provider": element.oembed.provider_name,
    ref: (ref) => {
      if (embeds[element.oembed.provider_name]) {
        embeds[element.oembed.provider_name].load(ref)
      }
    },
  }, element.label ? { className: `${className} ${element.label}` } : { className });

  const embedHtml = React.createElement('div', { dangerouslySetInnerHTML: { __html: element.oembed.html }});

  return React.createElement('div', propsWithUniqueKey(props, key), embedHtml);
}

export const asText = structuredText => PrismicRichText.asText(structuredText)

export const renderRichText = (richText, linkResolver, htmlSerializer, Component = Fragment) => {
  if (!validateRichText(richText)) {
    console.warn(richTextError);
    return null;
  }
  if (!validateComponent(Component)) {
    console.warn(componentError);
    return null;
  }
  const serializedChildren = PrismicRichText.serialize(richText, serialize.bind(null, linkResolver), htmlSerializer);
  return React.createElement(Component, propsWithUniqueKey(), serializedChildren);
}
