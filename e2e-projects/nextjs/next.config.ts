import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
	outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
	images: {
		remotePatterns: [{ hostname: "images.prismic.io" }],
	},
};

export default nextConfig;
