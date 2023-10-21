import * as fs from "fs";

export function base64_encode(file: string) {
	const bitmap = fs.readFileSync(file, "base64");
	return bitmap;
}
