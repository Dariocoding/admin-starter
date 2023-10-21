import { Module } from "@nestjs/common";
import { ExcelService } from "./excel.service";
import { ExcelController } from "./excel.controller";

@Module({
	controllers: [ExcelController],
	providers: [ExcelService],
	exports: [ExcelService],
})
export class ExcelModule {}
