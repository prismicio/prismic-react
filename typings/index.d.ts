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
};

type HTMLSerializer<T> = (
  type: ElementType,
  element: any,
  text: string | null,
  children: T[],
  index: number,
) => T;

declare class Richtext extends React.Component<RichTextProps, any>() {
  asText<string>(): string;
  displayName: string = 'RichText';
  asHtml(
    richText: any,
    linkResolver?: (doc: any) => string,
    serializer?: HTMLSerializer<string>,
  ): string;
  renderRichText<any>(): React.DOMElement;
  Elements: Elements
}

interface RichTextProps {
  Component?: React.ReactNode;
  htmlSerializer?: HTMLSerializer<string>;
  linkResolver<any>(): string;
  serializeHyperlink<any>();
  render<any>(): React.DOMElement;
  renderAsText<any>(): string;
}

interface Link {
  url(link: any, linkResolver?: (doc: any) => string): string;
}

export const RichText: RichText;
export const Link: Link;
export const HTMLSerializer: HTMLSerializer<string>;
export const Date: Date = <string>(): Date => { };


declare const _default: {
  RichText: RichText,
  Elements: Elements,
  Link: Link,
  Date: Date = <string>(): Date => { },
};

export default _default;
