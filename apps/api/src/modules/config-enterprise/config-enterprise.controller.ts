import { Controller, Get, Body, Put, Param, Delete } from "@nestjs/common";
import { ConfigEnterpriseService } from "./config-enterprise.service";
import { UpdateConfigEnterpriseDto } from "./dto/update-config-enterprise.dto";
import { ApiTags } from "@nestjs/swagger";
import { ValidRoles } from "@teslo/interfaces";
import { Auth } from "../auth/common/decorators";

@Controller("config-enterprise")
@ApiTags("Config Enterprise")
export class ConfigEnterpriseController {
  constructor(private readonly configEnterpriseService: ConfigEnterpriseService) {}

  @Get()
  find() {
    return this.configEnterpriseService.find();
  }

  @Put()
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
  update(@Body() updateConfigEnterpriseDto: UpdateConfigEnterpriseDto) {
    return this.configEnterpriseService.update(updateConfigEnterpriseDto);
  }
}
