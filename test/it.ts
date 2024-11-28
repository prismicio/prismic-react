/* eslint react-hooks/rules-of-hooks: 0 */

import { MockFactory, createMockFactory } from "@prismicio/mock";
import { test } from "vitest";

type Fixtures = {
	repositoryName: string;
	mock: MockFactory;
};

export const it = test.extend<Fixtures>({
	mock: async ({ task }, use) => {
		await use(createMockFactory({ seed: task.name }));
	},
	repositoryName: async ({ task }, use) => {
		const repositoryName = await sha1(task.name);
		await use(repositoryName);
	},
});

async function sha1(input: string) {
	const data = new TextEncoder().encode(input);
	const hash = await crypto.subtle.digest("SHA-1", data);
	const hashArray = Array.from(new Uint8Array(hash));

	return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
