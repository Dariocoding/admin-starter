import { Module } from "@nestjs/common";

import { AuthModule } from "../modules/auth/auth.module";

import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { ConfigAppModule } from "src/modules/config-app/config-app.module";

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, ConfigAppModule],
})
export class SeedModule {}
