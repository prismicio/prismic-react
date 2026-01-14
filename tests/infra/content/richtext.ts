export const model = {
	format: "custom",
	id: "rich_text_test",
	label: "Rich Text Test",
	repeatable: false,
	status: true,
	json: {
		Main: {
			empty: {
				type: "StructuredText",
				config: {
					label: "Empty",
					multi:
						"heading1,heading2,heading3,heading4,heading5,heading6,paragraph,preformatted,strong,em,listItem,oListItem,list,oList,image,embed,hyperlink,label,span",
				},
			},
			filled: {
				type: "StructuredText",
				config: {
					label: "Filled",
					multi:
						"heading1,heading2,heading3,heading4,heading5,heading6,paragraph,preformatted,strong,em,listItem,oListItem,list,oList,image,embed,hyperlink,label,span",
				},
			},
			keytext: {
				type: "Text",
				config: {
					label: "Key Text",
				},
			},
			select: {
				type: "Select",
				config: {
					label: "Select",
					options: ["foo"],
				},
			},
			heading1: {
				type: "StructuredText",
				config: {
					label: "Heading 1",
					multi: "heading1",
				},
			},
			heading2: {
				type: "StructuredText",
				config: {
					label: "Heading 2",
					multi: "heading2",
				},
			},
			heading3: {
				type: "StructuredText",
				config: {
					label: "Heading 3",
					multi: "heading3",
				},
			},
			heading4: {
				type: "StructuredText",
				config: {
					label: "Heading 4",
					multi: "heading4",
				},
			},
			heading5: {
				type: "StructuredText",
				config: {
					label: "Heading 5",
					multi: "heading5",
				},
			},
			heading6: {
				type: "StructuredText",
				config: {
					label: "Heading 6",
					multi: "heading6",
				},
			},
			paragraph: {
				type: "StructuredText",
				config: {
					label: "Paragraph",
					multi: "paragraph",
				},
			},
			preformatted: {
				type: "StructuredText",
				config: {
					label: "Preformatted",
					multi: "preformatted",
				},
			},
			strong: {
				type: "StructuredText",
				config: {
					label: "Strong",
					multi: "strong",
				},
			},
			em: {
				type: "StructuredText",
				config: {
					label: "Em",
					multi: "em",
				},
			},
			list: {
				type: "StructuredText",
				config: {
					label: "List",
					multi: "list-item",
				},
			},
			ordered_list: {
				type: "StructuredText",
				config: {
					label: "Ordered List",
					multi: "o-list-item",
				},
			},
			image: {
				type: "StructuredText",
				config: {
					label: "Image",
					multi: "image",
				},
			},
			embed: {
				type: "StructuredText",
				config: {
					label: "Embed",
					multi: "embed",
				},
			},
			hyperlink_internal: {
				type: "StructuredText",
				config: {
					label: "Hyperlink Internal",
					multi: "hyperlink",
				},
			},
			hyperlink_external: {
				type: "StructuredText",
				config: {
					label: "Hyperlink External",
					multi: "hyperlink",
				},
			},
			label: {
				type: "StructuredText",
				config: {
					label: "Label",
					multi: "paragraph",
					labels: ["bar"],
				},
			},
			rtl: {
				type: "StructuredText",
				config: {
					label: "RTL",
					multi: "rtl",
					labels: ["bar"],
				},
			},
		},
	},
} as const;

export function content(): Record<string, unknown> {
	return {
		filled: [
			{
				type: "paragraph",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
			{
				type: "paragraph",
				content: {
					text: "bar",
					spans: [],
				},
				direction: "ltr",
			},
		],
		keytext: "foo",
		select: "foo",
		heading1: [
			{
				type: "heading1",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
		],
		heading2: [
			{
				type: "heading2",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
		],
		heading3: [
			{
				type: "heading3",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
		],
		heading4: [
			{
				type: "heading4",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
		],
		heading5: [
			{
				type: "heading5",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
		],
		heading6: [
			{
				type: "heading6",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
		],
		paragraph: [
			{
				type: "paragraph",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
		],
		preformatted: [
			{
				type: "preformatted",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
		],
		strong: [
			{
				type: "paragraph",
				content: {
					text: "foo",
					spans: [
						{
							type: "strong",
							start: 0,
							end: 3,
						},
					],
				},
				direction: "ltr",
			},
		],
		em: [
			{
				type: "paragraph",
				content: {
					text: "foo",
					spans: [
						{
							type: "em",
							start: 0,
							end: 3,
						},
					],
				},
				direction: "ltr",
			},
		],
		list: [
			{
				type: "list-item",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
			{
				type: "list-item",
				content: {
					text: "bar",
					spans: [],
				},
				direction: "ltr",
			},
		],
		ordered_list: [
			{
				type: "o-list-item",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "ltr",
			},
			{
				type: "o-list-item",
				content: {
					text: "bar",
					spans: [],
				},
				direction: "ltr",
			},
		],
		image: [
			{
				type: "image",
				data: {
					edit: {
						background: "transparent",
						zoom: 1,
						crop: {
							x: 0,
							y: 0,
						},
					},
					height: 600,
					origin: {
						id: "Z1evSZbqstJ98PkD",
						url: "https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
						width: 800,
						height: 600,
					},
					width: 800,
					alt: "alt text",
					provider: "imgix",
					thumbnails: {},
					url: "https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
				},
			},
		],
		embed: [
			{
				type: "embed",
				data: {
					embed_url: "https://example.com",
					type: "link",
					version: "1.0",
					title: "title",
					provider_name: null,
					thumbnail_url: "thumbnail_url",
					html: "<div>html</div>",
				},
			},
		],
		hyperlink_internal: [
			{
				type: "paragraph",
				content: {
					text: "foo",
					spans: [
						{
							type: "hyperlink",
							start: 0,
							end: 3,
							data: {
								url: "/foo",
								target: "_self",
							},
						},
					],
				},
				direction: "ltr",
			},
		],
		hyperlink_external: [
			{
				type: "paragraph",
				content: {
					text: "foo",
					spans: [
						{
							type: "hyperlink",
							start: 0,
							end: 3,
							data: {
								url: "https://example.com",
								target: "_self",
							},
						},
					],
				},
				direction: "ltr",
			},
		],
		label: [
			{
				type: "paragraph",
				content: {
					text: "foo",
					spans: [
						{
							type: "label",
							start: 0,
							end: 3,
							data: "bar",
						},
					],
				},
				direction: "ltr",
			},
		],
		rtl: [
			{
				type: "paragraph",
				content: {
					text: "foo",
					spans: [],
				},
				direction: "rtl",
			},
		],
		empty_TYPE: "StructuredText",
		filled_TYPE: "StructuredText",
		keytext_TYPE: "Text",
		select_TYPE: "Select",
		heading1_TYPE: "StructuredText",
		heading2_TYPE: "StructuredText",
		heading3_TYPE: "StructuredText",
		heading4_TYPE: "StructuredText",
		heading5_TYPE: "StructuredText",
		heading6_TYPE: "StructuredText",
		paragraph_TYPE: "StructuredText",
		preformatted_TYPE: "StructuredText",
		strong_TYPE: "StructuredText",
		em_TYPE: "StructuredText",
		list_TYPE: "StructuredText",
		ordered_list_TYPE: "StructuredText",
		image_TYPE: "StructuredText",
		embed_TYPE: "StructuredText",
		hyperlink_internal_TYPE: "StructuredText",
		hyperlink_external_TYPE: "StructuredText",
		label_TYPE: "StructuredText",
		rtl_TYPE: "StructuredText",
	};
}
