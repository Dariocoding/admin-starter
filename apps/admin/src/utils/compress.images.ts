import Compressor from 'compressorjs';
import { File } from './extends';

export function compressImages(files: File[]): Promise<File[]> {
	return new Promise(async function (resolve) {
		let images: File[] = [];
		let processedImages: number = 0;
		let numImagesToProcess: number = files.length;
		for (let i = 0; i < numImagesToProcess; i++) {
			const file = files[i];
			await new Promise(resolve => {
				new Compressor(file, {
					quality: 0.6,
					resize: 'contain',
					success(result) {
						//@ts-ignore
						images[i] = result;
						resolve(result);
					},
				});
			});
			processedImages += 1;
		}
		if (processedImages === numImagesToProcess) {
			resolve(images);
		}
	});
}
