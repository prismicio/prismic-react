declare module "prismic-reactjs" {

	enum Elements {
		heading1 = "heading1",
		heading2 = "heading2",
		heading3 = "heading3",
		heading4 = "heading4",
		heading5 = "heading5",
		heading6 = "heading6",
		paragraph = "paragraph",
		preformatted = "preformatted",
		strong = "strong",
		em = "em",
		listItem = "list-item",
		oListItem = "o-list-item",
		list = "group-list-item",
		oList = "group-o-list-item",
		image = "image",
		embed = "embed",
		hyperlink = "hyperlink",
		label = "label",
		span = "span",
	}

	export type RichTextSpan = {
		start: number;
		end: number;
		type: "strong" | "hyperlink";
		data?: {
			link_type: string;
			url: string;
			target?: string;
		};
	};

	export type RichTextBlock = {
		type: Elements;
		text: string;
		spans: RichTextSpan[];
	};

	export type HTMLSerializer<T> = (
		type: React.ElementType,
		element: any,
		content: string,
		children: T[],
		key: string
	) => T | null;

	export interface RichTextProps {
		Component?: React.ReactNode;
		elements?: {};
		htmlSerializer?: HTMLSerializer<React.ReactNode>;
		linkResolver?: () => string;
		render?: RichTextBlock[];
		renderAsText?: any;
		serializeHyperlink?: () => React.ReactNode;
	}

	export const RichText: React.FC<RichTextProps> & {
		asText: (input: RichTextBlock[]) => string;
		render: (input: RichTextBlock[]) => React.ReactNode;
		displayName: "RichText";
	};

	interface LinkProps {
		url(link: any, linkResolver?: (doc: any) => string): string;
	}

	export const Link: React.FC<LinkProps> & {
		url: (link: any, linkResolver?: (doc: any) => string) => string;
	};

	interface PrismicDate {
		(date?: string): Date;
	}

	export const Date: PrismicDate;
}