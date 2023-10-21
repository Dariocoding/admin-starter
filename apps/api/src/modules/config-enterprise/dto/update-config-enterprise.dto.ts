import { PartialType } from '@nestjs/swagger';
import { CreateConfigEnterpriseDto } from './create-config-enterprise.dto';

export class UpdateConfigEnterpriseDto extends PartialType(CreateConfigEnterpriseDto) {}
