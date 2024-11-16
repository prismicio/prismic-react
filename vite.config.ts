import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";
import preserveDirectives from "rollup-preserve-directives";

import { dependencies, peerDependencies } from "./package.json";

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: {
				index: "./src/index.ts" },
			formats: ["es"],
		},
		minify: false,
		sourcemap: true,
		rollupOptions: {
			output: {
				preserveModules: true,
				preserveModulesRoot: "./src",
			},
			external: [
				...Object.keys(dependencies),
				...Object.keys(peerDependencies),
			].map((name) => new RegExp(`^${name}(?:\/.*)?$`)),
			plugins: [typescript(), preserveDirectives()],
		},
	},
	test: {
		coverage: {
			provider: "v8",
			reporter: ["lcovonly", "text"],
		},
		setupFiles: ["./test/__setup__"],
	},
});
