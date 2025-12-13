export const model = {
	format: "custom",
	id: "link_test",
	label: "Link Test",
	repeatable: false,
	status: true,
	json: {
		Main: {
			empty: {
				type: "Link",
				config: {
					label: "Empty",
					placeholder: "",
					allowTargetBlank: true,
					select: null,
					allowText: false,
				},
			},
			internal_web: {
				type: "Link",
				config: {
					label: "Internal Web",
					placeholder: "",
					allowTargetBlank: true,
					select: null,
					allowText: false,
				},
			},
			external_web: {
				type: "Link",
				config: {
					label: "External Web",
					placeholder: "",
					allowTargetBlank: true,
					select: null,
					allowText: false,
				},
			},
			external_web_with_target: {
				type: "Link",
				config: {
					label: "External Web With Target",
					placeholder: "",
					allowTargetBlank: true,
					select: null,
					allowText: false,
				},
			},
			document: {
				type: "Link",
				config: {
					label: "Document",
					placeholder: "",
					allowTargetBlank: true,
					select: null,
					allowText: false,
				},
			},
			media: {
				type: "Link",
				config: {
					label: "Media",
					placeholder: "",
					allowTargetBlank: true,
					select: null,
					allowText: false,
				},
			},
			with_text: {
				type: "Link",
				config: {
					label: "With Text",
					placeholder: "",
					allowTargetBlank: true,
					select: null,
					allowText: true,
				},
			},
		},
	},
} as const;

export function content(args: { documentLinkID: string }) {
	const { documentLinkID } = args;

	return {
		external_web: {
			key: "d783f7b6-4966-4b32-b259-20f8f175cf12",
			url: "https://example.com",
			text: "",
		},
		external_web_with_target: {
			key: "b17ec7a7-aae7-4eea-aa88-d2a1c58bc96c",
			url: "https://example.com",
			target: "_blank",
		},
		media: {
			key: "86e923c4-e0d5-43bb-8e7d-b5a4eef709d9",
			id: "Z1eqf5bqstJ98PjU",
			name: "image.jpg",
			url: "https://images.prismic.io/prismicio-next-test/Z1eqf5bqstJ98PjU_ryoji-iwata-n31JPLu8_Pw-unsplash.jpg?auto=format,compress",
			kind: "image",
			size: "672683",
			height: "2560",
			width: "1709",
			date: "1733798531133",
		},
		with_text: {
			key: "6904f592-60b3-4f96-a961-aeaa97573b6f",
			url: "https://example.com",
			text: "foo",
		},
		document: {
			key: "96fa3267-13bd-4e6c-9317-717313aed643",
			id: documentLinkID,
		},
		internal_web: {
			key: "69e09a1a-8d52-4172-810c-623fc13736b3",
			url: "/foo",
		},
		empty_TYPE: "Link",
		internal_web_TYPE: "Link",
		external_web_TYPE: "Link",
		external_web_with_target_TYPE: "Link",
		document_TYPE: "Link",
		media_TYPE: "Link",
		with_text_TYPE: "Link",
	};
}
