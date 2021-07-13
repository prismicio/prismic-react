export const isInternalURL = (url: string): boolean => {
	const isInternal = /^(\/(?!\/)|#)/.test(url);
	const isSpecialLink = !isInternal && !/^https?:\/\//.test(url);

	return isInternal && !isSpecialLink;
};
