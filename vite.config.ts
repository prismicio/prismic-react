import { defineConfig } from "vite";
import sdk from "vite-plugin-sdk";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [sdk(), react()],
	build: {
		lib: {
			entry: {
				index: "./src/index.ts",
				rsc: "./src/rsc/index.ts",
			},
		},
		rollupOptions: {
			external: ["@prismicio/react/config"],
		},
	},
});
