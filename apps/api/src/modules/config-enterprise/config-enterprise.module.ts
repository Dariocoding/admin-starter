import { Module, Global } from '@nestjs/common';
import { ConfigEnterpriseService } from './config-enterprise.service';
import { ConfigEnterpriseController } from './config-enterprise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEnterprise } from './entities/config-enterprise.entity';

@Global()
@Module({
	controllers: [ConfigEnterpriseController],
	providers: [ConfigEnterpriseService],
	imports: [TypeOrmModule.forFeature([ConfigEnterprise])],
	exports: [TypeOrmModule, ConfigEnterpriseService],
})
export class ConfigEnterpriseModule {}
