import * as crypto from "crypto";

/**
 * Generates an MD5 hash from an input.
 *
 * @param input - Value used to generate the hash.
 *
 * @returns MD5 representation of `input`.
 */
export const md5 = (input: crypto.BinaryLike): string => {
	return crypto.createHash("md5").update(input).digest("hex");
};
