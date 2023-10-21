import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestPasswordEmailDto {
  @ApiProperty({ example: 'test1@gmail.com' })
  @IsString()
  email: string;
}
