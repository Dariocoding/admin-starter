import { existsSync } from "fs";
import { join } from "path";

import { Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class FilesService {
	getStaticProductImage(imageName: string) {
		return this.getPath({
			imageName,
			name: "product",
			staticPath: "products",
		});
	}

	getLogoEnterpriseImage(mode: string, type: string) {
		return this.getPath({
			imageName: `/logo-${mode}-${type}.png`,
			name: "logo enterprise",
			staticPath: `logo_enterprise`,
		});
	}

	private getPath(object: { imageName: string; name: string; staticPath: string }) {
		const { staticPath, imageName, name } = object;
		const path = join(__dirname, `../../static/${staticPath}`, imageName);
		if (!existsSync(path))
			throw new BadRequestException(`No ${name} found with image ${imageName}`);
		return path;
	}
}
