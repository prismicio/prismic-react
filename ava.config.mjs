export default {
	extensions: ["ts", "tsx"],
	files: ["./test/**/*.test.ts", "./test/**/*.test.tsx"],
	require: ["esbuild-register", "global-jsdom/register"],
	verbose: true,
	timeout: "60s",
};
