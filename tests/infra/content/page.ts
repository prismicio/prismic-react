export const model = {
	format: "page",
	id: "page",
	label: "Page",
	repeatable: false,
	status: true,
	json: {
		Filled: {
			filled: {
				type: "Slices",
				fieldset: "Slice Zone",
				config: {
					choices: {
						text: {
							type: "SharedSlice",
						},
						image: {
							type: "SharedSlice",
						},
					},
				},
			},
		},
		Empty: {
			empty: {
				type: "Slices",
				fieldset: "Slice Zone",
				config: {
					choices: {
						text: {
							type: "SharedSlice",
						},
						image: {
							type: "SharedSlice",
						},
					},
				},
			},
		},
	},
} as const;

export const slices = {
	text: {
		id: "text",
		type: "SharedSlice",
		name: "Text",
		description: "Text",
		variations: [
			{
				id: "default",
				name: "Default",
				docURL: "...",
				version: "sktwi1xtmkfgx8626",
				description: "Text",
				primary: {
					content: {
						type: "StructuredText",
						config: {
							label: "Text",
							multi: "paragraph",
						},
					},
				},
				items: {},
				imageUrl:
					"https://images.prismic.io/slice-machine/621a5ec4-0387-4bc5-9860-2dd46cbc07cd_default_ss.png?auto=compress,format",
			},
		],
	},
	image: {
		id: "image",
		type: "SharedSlice",
		name: "Image",
		description: "Image",
		variations: [
			{
				id: "default",
				name: "Default",
				docURL: "...",
				version: "sktwi1xtmkfgx8626",
				description: "Image",
				primary: {
					content: {
						type: "Image",
						config: {
							label: "Image",
						},
					},
				},
				items: {},
				imageUrl:
					"https://images.prismic.io/slice-machine/621a5ec4-0387-4bc5-9860-2dd46cbc07cd_default_ss.png?auto=compress,format",
			},
		],
	},
} as const;

export function content() {
	return {
		filled: [
			{
				key: "text$877e9385-8cbd-4af2-bd65-f31d3a2588cf",
				value: {
					primary: {
						content: [
							{
								type: "paragraph",
								content: {
									text: "foo",
									spans: [],
								},
								direction: "ltr",
							},
						],
					},
					items: [],
					variation: "default",
				},
			},
			{
				key: "image$a7f3e5f0-5726-41fc-9603-90c52e76e5d1",
				value: {
					primary: {
						content: {
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
								id: "Z4b5OJbqstJ99d38",
								url: "https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
								width: 800,
								height: 600,
							},
							width: 800,
							provider: "imgix",
							url: "https://images.prismic.io/prismicio-next-test/Z1evSZbqstJ98PkD_image.jpg?auto=format,compress",
						},
					},
					items: [],
					variation: "default",
				},
			},
		],
		filled_TYPE: "Slices",
		"filled.text_TYPE": "SharedSlice",
		"filled.text.variations.default.primary.content_TYPE": "StructuredText",
		"filled.image_TYPE": "SharedSlice",
		"filled.image.variations.default.primary.content_TYPE": "Image",
	};
}
