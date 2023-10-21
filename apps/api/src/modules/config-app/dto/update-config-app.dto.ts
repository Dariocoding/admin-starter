import { PartialType } from '@nestjs/swagger';
import { CreateConfigAppDto } from './create-config-app.dto';

export class UpdateConfigAppDto extends PartialType(CreateConfigAppDto) {}
