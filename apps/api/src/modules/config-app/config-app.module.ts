import { Module, Global } from '@nestjs/common';
import { ConfigAppService } from './config-app.service';
import { ConfigAppController } from './config-app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigApp } from './entities/config-app.entity';

@Global()
@Module({
	controllers: [ConfigAppController],
	providers: [ConfigAppService],
	exports: [TypeOrmModule, ConfigAppService],
	imports: [TypeOrmModule.forFeature([ConfigApp])],
})
export class ConfigAppModule {}
