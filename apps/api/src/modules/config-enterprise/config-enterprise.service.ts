import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateConfigEnterpriseDto } from "./dto/update-config-enterprise.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigEnterprise } from "./entities/config-enterprise.entity";

@Injectable()
export class ConfigEnterpriseService {
  constructor(
    @InjectRepository(ConfigEnterprise)
    private readonly configEnterpriseRepository: Repository<ConfigEnterprise>
  ) {}

  async find(): Promise<Partial<ConfigEnterprise>> {
    const configs = await this.configEnterpriseRepository.find({});
    const { idconfig, ...config } = (configs[0] || {}) as Partial<ConfigEnterprise>;
    return config;
  }

  async update(updateConfigEnterpriseDto: UpdateConfigEnterpriseDto) {
    const config = await this.configEnterpriseRepository.find();

    if (!config.length) {
      throw new NotFoundException(
        "No se encontró la configuración de la empresa. Por favor, cree una"
      );
    }

    const { idconfig } = config[0];
    await this.configEnterpriseRepository.update(idconfig, { ...updateConfigEnterpriseDto });
    return this.find();
  }
}
