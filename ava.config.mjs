export default {
	extensions: ["ts", "tsx"],
	files: ["./test/**/*.test.ts", "./test/**/*.test.tsx"],
	require: ["esbuild-register"],
	verbose: true,
	timeout: "60s",
};
