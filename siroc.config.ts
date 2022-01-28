import { defineSirocConfig, PackageJson } from "siroc";
import fs from "fs";

export default defineSirocConfig({
	rollup: {
		output: {
			sourcemap: true,
		},
	},
	hooks: {
		"build:done": (pkg) => {
			// Type assertion is needed to add the `react-native`
			// key. It is non-standard and not included in
			// `siroc`'s built-in types.
			const packageJson = pkg.pkg as PackageJson & {
				["react-native"]?: string;
			};

			if (
				packageJson.module &&
				packageJson["react-native"] &&
				pkg.pkg.module !== packageJson["react-native"]
			) {
				fs.copyFileSync(packageJson.module, packageJson["react-native"]);
			}
		},
	},
});
