const pkg = require("./package.json");

function getObjectValues(input, acc = []) {
	if (typeof input === "string") {
		return input;
	} else {
		return [
			...acc,
			...Object.values(input).flatMap((value) => getObjectValues(value)),
		];
	}
}

module.exports = [
	...new Set([pkg.main, pkg.module, ...getObjectValues(pkg.exports)]),
]
	.sort()
	.filter((path) => {
		return path && path !== "./package.json";
	})
	.map((path) => {
		return { path };
	});
