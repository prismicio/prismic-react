import PrismicRichText, {Elements} from 'prismic-richtext';
import { Link as LinkHelper } from 'prismic-helpers';

function serialize(linkResolver, type, element, content, children) {
  switch(type) {
    case Elements.heading1: return;
    case Elements.heading2: return;
    case Elements.heading3: return;
    case Elements.heading4: return;
    case Elements.heading5: return;
    case Elements.heading6: return;
    case Elements.paragraph: return;
    case Elements.preformatted: return;
    case Elements.strong: return;
    case Elements.em: return;
    case Elements.listItem: return;
    case Elements.oListItem: return;
    case Elements.list: return;
    case Elements.oList: return;
    case Elements.image: return;
    case Elements.embed: return;
    case Elements.hyperlink: return;
    case Elements.label: return;
    case Elements.span: return;
    default: return;
  }
}

export default {
  asText(structuredText) {
    return structuredText.reduce((acc, block) => {
      return `${acc} ${block.text}`;
    }, '');
  },

  asJsx(richText, linkResolver, htmlSerializer) {
    const serializedChildren = PrismicRichText.serialize(richText, serialize.bind(null, linkResolver), htmlSerializer);
    return; //return React Div with serialized children in it.
  }
}
