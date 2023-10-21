import { BadRequestException, Injectable } from "@nestjs/common";
import { ISendMailOptions } from "@nestjs-modules/mailer";
import { ForgetPassword } from "./interfaces";
import { ConfigEnterpriseService } from "src/modules/config-enterprise/config-enterprise.service";
import { ConfigAppService } from "src/modules/config-app/config-app.service";
import { ConfigApp } from "src/modules/config-app/entities/config-app.entity";
import { ConfigEnterprise } from "src/modules/config-enterprise/entities/config-enterprise.entity";
import * as nodemailer from "nodemailer";
import * as hbs from "nodemailer-express-handlebars";
import { join } from "path";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const dirTemplate = join(__dirname, "templates");

@Injectable()
export class MailService {
  constructor(
    private configEnterpriseService: ConfigEnterpriseService,
    private configAppService: ConfigAppService
  ) {}

  forgetPassword(object: ForgetPassword) {
    const { user, urlRecovery } = object;

    return this.sendMailObject((configEnterprise) => ({
      to: user?.email,
      subject: `Forgot your password in: ${configEnterprise.name}`,
      template: "./forgetPassword",
      context: {
        name_app: configEnterprise.name,
        urlRecovery,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      },
    }));
  }

  private async sendMailObject(
    callback: (
      configEnterprise: Partial<ConfigEnterprise>,
      configApp: Partial<ConfigApp>
    ) => ISendMailOptions
  ) {
    const [configEnterprise, configApp] = await Promise.all([
      this.configEnterpriseService.find(),
      this.configAppService.find({ values: ["email"] }),
    ]);
    const { ...options } = callback(configEnterprise, configApp);
    const transport = this.getTransport(configApp);
    try {
      const req = await (transport.sendMail({
        to: options.to,
        from: options.from || `"${configApp.emailName}" <${configApp.emailFrom}>`,
        subject: options.subject,
        //@ts-ignore
        template: options.template,
        context: options.context,
      }) as Promise<SMTPTransport.SentMessageInfo>);

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        "Error al enviar el correo, por favor intente de nuevo más tarde o contacte al administrador"
      );
    }
  }

  private getTransport(configApp: Partial<ConfigApp>) {
    const transport = nodemailer.createTransport({
      auth: {
        user: configApp.emailUser,
        pass: configApp.emailPassword,
      },
      host: configApp.emailHost,
      secure: configApp.emailPort === 465,
      port: configApp.emailPort,
      tls: {
        ciphers: "SSLv3",
      },
    });
    const options: hbs.NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        layoutsDir: dirTemplate,
        extname: ".handlebars",
        defaultLayout: null,
        partialsDir: dirTemplate,
      },
      viewPath: dirTemplate,
    };
    transport.use("compile", hbs(options));

    return transport;
  }
}
