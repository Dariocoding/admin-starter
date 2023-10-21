import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateConfigEnterpriseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  address: string;
}
