export const model = {
	format: "custom",
	id: "table_test",
	label: "Table Test",
	repeatable: false,
	status: true,
	json: {
		Main: {
			empty: {
				type: "Table",
				config: {
					label: "Empty",
				},
			},
			filled: {
				type: "Table",
				config: {
					label: "Filled",
				},
			},
		},
	},
} as const;

export function content(): Record<string, unknown> {
	return {
		filled: {
			content: [
				{
					type: "tableRow",
					content: [
						{
							type: "tableHeader",
							content: [
								{
									content: {
										text: "Method",
									},
									type: "paragraph",
								},
							],
						},
						{
							type: "tableHeader",
							content: [
								{
									type: "paragraph",
									attrs: {
										dir: "ltr",
									},
									content: {
										text: "Usage",
									},
								},
							],
						},
					],
				},
				{
					type: "tableRow",
					content: [
						{
							type: "tableHeader",
							content: [
								{
									type: "paragraph",
									attrs: {
										dir: "ltr",
									},
									content: {
										text: "GET",
									},
								},
							],
						},
						{
							type: "tableCell",
							content: [
								{
									content: {
										spans: [
											{
												type: "strong",
												end: 19,
												start: 4,
											},
										],
										text: "For basic retrieval of information…",
									},
									type: "paragraph",
								},
							],
						},
					],
				},
				{
					type: "tableRow",
					content: [
						{
							type: "tableHeader",
							content: [
								{
									content: {
										text: "DELETE",
									},
									type: "paragraph",
								},
							],
						},
						{
							type: "tableCell",
							content: [
								{
									content: {
										spans: [
											{
												type: "em",
												end: 7,
												start: 3,
											},
										],
										text: "To destroy a resource and remove…",
									},
									type: "paragraph",
								},
							],
						},
					],
				},
			],
		},
		empty_TYPE: "Table",
		filled_TYPE: "Table",
	};
}
