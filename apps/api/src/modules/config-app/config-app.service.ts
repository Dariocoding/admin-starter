import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateConfigAppDto } from "./dto/update-config-app.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigApp } from "./entities/config-app.entity";
import { Repository } from "typeorm";
import { GetConfigAppParams } from "./dto/get-config-app-params";

@Injectable()
export class ConfigAppService {
  constructor(
    @InjectRepository(ConfigApp)
    private readonly configAppRepository: Repository<ConfigApp>
  ) {}

  async find(query: GetConfigAppParams) {
    if (!query || !query?.values?.length) query = { values: ["colors"] };
    const configs = await this.configAppRepository.find({
      //@ts-ignore
      select: {
        ...(query.values.includes("colors") ? { colorsAdmin: true } : {}),
        ...(query.values.includes("email")
          ? {
              emailFrom: true,
              emailHost: true,
              emailName: true,
              emailPassword: true,
              emailPort: true,
              emailSecure: true,
              emailUser: true,
            }
          : {}),
      },
    });
    const { id, ...config } = (configs[0] || {}) as Partial<ConfigApp>;
    return config;
  }

  async update(updateConfigAppDto: UpdateConfigAppDto) {
    const config = await this.configAppRepository.find();

    if (!config.length) {
      throw new NotFoundException(
        "No se encontró la configuración de la empresa. Por favor, cree una"
      );
    }

    const { id } = config[0];
    await this.configAppRepository.update(id, { ...updateConfigAppDto });
    return { ...config[0], ...updateConfigAppDto };
  }
}
