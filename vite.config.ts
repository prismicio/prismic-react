import { defineConfig } from "vite";
import sdk from "vite-plugin-sdk";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [sdk(), react()],
	test: {
		coverage: {
			reporter: ["lcovonly", "text"],
		},
		setupFiles: ["./test/__setup__"],
	},
});
