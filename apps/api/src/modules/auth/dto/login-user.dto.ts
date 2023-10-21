import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Username',
    required: true,
    nullable: false,
    minLength: 1,
    example: 'test1@gmail.com',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    nullable: false,
    minLength: 1,
    example: 'password',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  /*   @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  }) */
  password: string;
}
