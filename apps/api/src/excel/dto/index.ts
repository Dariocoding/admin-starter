import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class ExcelParamsDto {
	@ApiProperty({ default: false })
	@IsOptional()
	@Transform(({ value }) => value === "true" || value === true)
	@IsBoolean()
	csv: boolean;
}
