import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

type ValuesGet = "email" | "colors";

export class GetConfigAppParams {
  @ApiPropertyOptional({
    default: ["email", "colors"],
    enum: ["email", "colors"],
  })
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => (value.split?.(",") ? value.split?.(",") : value))
  @IsOptional()
  values: ValuesGet[];
}
