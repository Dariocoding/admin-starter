import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { SeedService } from "./seed.service";
import { Auth } from "src/modules/auth/common/decorators";
import { ValidRoles } from "@teslo/interfaces";

@ApiTags("Seed")
@Controller("seed")
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return this.seedService.runSeed();
  }

  @Get("/resetApp")
  @Auth(ValidRoles.SUPER_USER)
  resetApp() {
    return this.seedService.deleteTables({
      deleteUsers: false,
      removeConfigData: false,
    });
  }
}
