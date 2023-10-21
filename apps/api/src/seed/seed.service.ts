import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { initialData } from "./data/seed-data";
import { User } from "../modules/users/entities/user.entity";
import { ConfigEnterprise } from "src/modules/config-enterprise/entities/config-enterprise.entity";
import { ConfigApp } from "src/modules/config-app/entities/config-app.entity";

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ConfigEnterprise)
    private readonly configEnterpriseRepository: Repository<ConfigEnterprise>,

    @InjectRepository(ConfigApp)
    private readonly configAppRepository: Repository<ConfigApp>
  ) {}

  async runSeed() {
    await this.deleteTables();
    const [adminUser /*  configEnterprise */] = await Promise.all([
      this.insertUsers(),
      this.insertConfigEnterprise(),
      this.insertConfigApp(),
    ]);

    return "SEED EXECUTED";
  }

  async deleteTables(options?: { deleteUsers?: boolean; removeConfigData?: boolean }) {
    const { deleteUsers = true, removeConfigData = true } = options || {};

    const queryBuilderUser = this.userRepository.createQueryBuilder();
    const queryBuilderConfigEnterprise = this.configEnterpriseRepository.createQueryBuilder();
    const queryBuilderConfigApp = this.configAppRepository.createQueryBuilder();

    await Promise.all([
      deleteUsers && queryBuilderUser.delete().where({}).execute(),
      removeConfigData && queryBuilderConfigEnterprise.delete().where({}).execute(),
      removeConfigData && queryBuilderConfigApp.delete().where({}).execute(),
    ]);
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertConfigEnterprise() {
    const configEnterprise = this.configEnterpriseRepository.create(initialData.configEnterprise);

    const dbConfigEnterprise = await this.configEnterpriseRepository.save(configEnterprise);
    return dbConfigEnterprise[0];
  }

  private async insertConfigApp() {
    const configApp = [initialData.configApp];

    const insertPromises: ConfigApp[] = [];

    configApp.forEach((config) => {
      insertPromises.push(this.configAppRepository.create(config));
    });

    const dbConfigApp = await this.configAppRepository.save(insertPromises);
    return dbConfigApp[0];
  }
}
