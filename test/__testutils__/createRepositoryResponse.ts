import * as prismic from "@prismicio/client";

import { createRef } from "./createRef";

export const createRepositoryResponse = (
	overrides?: Partial<prismic.Repository>,
): prismic.Repository => {
	return {
		refs: [createRef(true)],
		bookmarks: {},
		languages: [
			{
				id: "fr-fr",
				name: "French - France",
			},
		],
		types: {
			foo: "Foo",
		},
		tags: ["foo", "bar"],
		forms: {},
		experiments: {
			draft: [
				{
					id: "WG-DPigAAJMbct0d",
					name: "Test_sre",
					variations: [
						{
							id: "WG-DPigAADIbct0f",
							ref: "WG-DPigAADgAct0g~WYx9HB8AAB8AmX7z",
							label: "Base",
						},
					],
				},
			],
			running: [
				{
					id: "WG-DPigAAJMbct0X",
					name: "experimentA",
					variations: [
						{
							id: "WG-DPigAADIbct0X",
							ref: "WG-DPigAADgAct0g~WYx9HB8AAB8AmX7X",
							label: "variationA",
						},
					],
				},
			],
		},
		oauth_initiate: "oauth_initiate",
		oauth_token: "oauth_token",
		version: "version",
		license: "All Rights Reserved",
		...overrides,
	};
};
