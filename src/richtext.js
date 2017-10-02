import PrismicRichText, {Elements} from 'prismic-richtext';
import React from 'react';
import uuid from './uuid';
import { Link as LinkHelper } from 'prismic-helpers';

function serialize(linkResolver, type, element, content, children) {
  switch(type) {
    case Elements.heading1: return serializeStandardTag('h1', element, children);
    case Elements.heading2: return serializeStandardTag('h2', element, children);
    case Elements.heading3: return serializeStandardTag('h3', element, children);
    case Elements.heading4: return serializeStandardTag('h4', element, children);
    case Elements.heading5: return serializeStandardTag('h5', element, children);
    case Elements.heading6: return serializeStandardTag('h6', element, children);
    case Elements.paragraph: return serializeStandardTag('p', element, children);
    case Elements.preformatted: return serializeStandardTag('pre', element, children);
    case Elements.strong: return serializeStandardTag('strong', element, children);
    case Elements.em: return serializeStandardTag('em', element, children);
    case Elements.listItem: return serializeStandardTag('li', element, children);
    case Elements.oListItem: return serializeStandardTag('li', element, children);
    case Elements.list: return serializeStandardTag('ul', element, children);
    case Elements.oList: return serializeStandardTag('ol', element, children);
    case Elements.image: return serializeImage(linkResolver, element);
    case Elements.embed: return serializeEmbed(element);
    case Elements.hyperlink: return serializeHyperlink(linkResolver, element, children);
    case Elements.label: return serializeLabel(element, children);
    case Elements.span: return serializeSpan(content);
    default: return null;
  }
}

function propsWithUniqueKey(props) {
  return Object.assign(props || {}, {key: uuid()});
}

function serializeStandardTag(tag, element, children) {
  const props = element.label ? Object.assign({}, {className: element.label}) : {};
  return React.createElement(tag, propsWithUniqueKey(props), children);
}

function serializeHyperlink(linkResolver, element, children) {
  const targetAttr = element.data.target ? { target: element.data.target } : {};
  const props = Object.assign({ href: LinkHelper.url(element.data, linkResolver) }, targetAttr);
  return React.createElement('a', propsWithUniqueKey(props), children);
}

function serializeLabel(element, children) {
  const props = element.data ? Object.assign({}, { className: element.data }) : {};
  return React.createElement('span', propsWithUniqueKey(props), children);
}

function serializeSpan(content) {
  return content;
}

function serializeImage(linkResolver, element) {
  const linkUrl = element.linkTo ? LinkHelper.url(element.linkTo, linkResolver) : null;
  const linkTarget = (element.linkTo && element.linkTo.target) ? { target: element.linkTo.target } : {};
  const img = React.createElement('img', { src: element.url , alt: element.alt || '' });
  
  return React.createElement(
    'p',
    propsWithUniqueKey({ className: [element.label || '', 'block-img'].join('') }),
    linkUrl ? React.createElement('a', Object.assign({ href: linkUrl }, linkTarget), img) : img
  );
}

function serializeEmbed(element) {
  const props = Object.assign({
    "data-oembed": element.embed_url,
    "data-oembed-type": element.type,
    "data-oembed-provider": element.provider_name,
  }, element.label ? {className: element.label} : {});

  const embedHtml = React.createElement('div', {dangerouslySetInnerHTML: {__html: element.oembed.html}});

  return React.createElement('div', propsWithUniqueKey(props), embedHtml);
}

export default {
  asText(structuredText) {
    return PrismicRichText.asText(structuredText);
  },

  render(richText, linkResolver, htmlSerializer) {
    const serializedChildren = PrismicRichText.serialize(richText, serialize.bind(null, linkResolver), htmlSerializer);
    return React.createElement('div', propsWithUniqueKey(), serializedChildren);
  }
}
