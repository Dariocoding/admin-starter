import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "./common/common.module";
import { SeedModule } from "./seed/seed.module";
import { FilesModule } from "./files/files.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { MailModule } from "./mail/mail.module";
import { ConfigEnterpriseModule } from "./modules/config-enterprise/config-enterprise.module";
import { ConfigAppModule } from "./modules/config-app/config-app.module";
import { ExcelModule } from "./excel/excel.module";
import { resolve } from "path";

/* import * as dotenv from "dotenv";

 dotenv.config({ path: resolve(__dirname, "../.env") });
console.log({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}); */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: resolve(__dirname, "../.env"),
    }),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === "prod",
      extra: {
        ssl: process.env.STAGE === "prod" ? { rejectUnauthorized: false } : null,
      },
      type: "mysql",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    UsersModule,

    MailModule,

    ConfigEnterpriseModule,

    ConfigAppModule,

    ExcelModule,

    /*    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "admin", "dist"),
      renderPath: "/*",
      exclude: ["/api*"],
    }), */
  ],
  providers: [],
})
export class AppModule {}
