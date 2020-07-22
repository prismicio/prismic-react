enum Elements {
  heading1 = 'heading1',
  heading2 = 'heading2',
  heading3 = 'heading3',
  heading4 = 'heading4',
  heading5 = 'heading5',
  heading6 = 'heading6',
  paragraph = 'paragraph',
  preformatted = 'preformatted',
  strong = 'strong',
  em = 'em',
  listItem = 'list-item',
  oListItem = 'o-list-item',
  list = 'group-list-item',
  oList = 'group-o-list-item',
  image = 'image',
  embed = 'embed',
  hyperlink = 'hyperlink',
  label = 'label',
  span = 'span',
}

export type HTMLSerializer<T> = (
  type: ElementType,
  element: any,
  text: string | null,
  children: T[],
  index: number
) => T;
export interface RichTextProps {
  Component?: React.ReactNode;
  htmlSerializer?: HTMLSerializer<T>;
  linkResolver?: () => string;
  serializeHyperlink?: () => string;
  render: () => React.DOMElement;
}

class RichText extends React.Component<RichTextProps, any> {
  static asText(text: string): string;
}

interface Link {
  url(link: any, linkResolver?: (doc: any) => string): string;
}

const Link: Link;
const Date: Date = <string>(): Date => {};

export { RichText, Elements, Link, Date };
