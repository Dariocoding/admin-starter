import { Module, Global } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";

@Global()
@Module({
	controllers: [FilesController],
	providers: [FilesService],
	imports: [ConfigModule],
	exports: [FilesService],
})
export class FilesModule {}
