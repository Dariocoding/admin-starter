import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ValidRol, ValidRoles } from "@teslo/interfaces";
import { EXAMPLE_UUID } from "src/common/utils";

export class CreateUserDto {
  @ApiProperty({ example: "Dario", nullable: false, minLength: 1 })
  @IsString()
  @MinLength(1)
  firstName?: string;

  @ApiProperty({ example: "Flores", nullable: false, minLength: 1 })
  @IsString()
  @MinLength(1)
  lastName?: string;

  @ApiProperty({ example: "password", nullable: false, minLength: 6 })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsOptional()
  /*   @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  }) */
  password?: string;

  @ApiProperty({
    example: ValidRoles.ADMIN,
    nullable: false,
  })
  @IsString({ each: true })
  @IsOptional()
  roles?: ValidRol[];

  @ApiProperty({ example: true, nullable: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: "test1@gmail.com", nullable: false, minLength: 1 })
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: "041206021601", nullable: true })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: EXAMPLE_UUID })
  @IsString()
  @IsOptional()
  token?: string;
}
