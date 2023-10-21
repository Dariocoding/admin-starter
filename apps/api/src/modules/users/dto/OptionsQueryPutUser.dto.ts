import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class OptionsQueryPutUser {
	@ApiProperty({ default: true })
	@IsOptional()
	@Transform(({ value }) => value === "true" || value === true)
	@IsBoolean()
	returnUser: boolean;
}
