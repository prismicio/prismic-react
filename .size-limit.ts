import type { SizeLimitConfig } from "size-limit";
import { exports } from "./package.json";

module.exports = [
	{
		name: "@prismicio/react",
		path: exports["."].default,
	},
] satisfies SizeLimitConfig;
