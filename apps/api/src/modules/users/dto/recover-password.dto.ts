import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';
import { EXAMPLE_UUID } from 'src/common/utils';

export class RecoverPasswordDto {
  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'passwordConfirm' })
  @IsString()
  passwordConfirm: string;

  @ApiProperty({ example: 'test1@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: EXAMPLE_UUID })
  @IsUUID()
  @IsString()
  token: string;

  @ApiProperty({ example: EXAMPLE_UUID })
  @IsString()
  iduser: string;
}
