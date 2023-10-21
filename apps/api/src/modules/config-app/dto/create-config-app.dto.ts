import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateConfigAppDto {
  @ApiProperty()
  @IsObject()
  @IsOptional()
  colorsAdmin: Object;

  @ApiProperty()
  @IsPositive()
  @IsOptional()
  emailPort?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emailHost?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emailUser?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emailPassword?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emailFrom?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emailName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  emailSecure?: string;
}
