import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as compression from "compression";
import { FrontendMiddleware } from "./frontend.middleware";
/* import * as os from "os"; */

/* const cluster = require("node:cluster");
const numCPUs = os.cpus().length; */

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger("Bootstrap");

  /* 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  ); */

  app.setGlobalPrefix("/api");
  app.use(FrontendMiddleware);

  const config = new DocumentBuilder()
    .setTitle("Teslo RESTFul API")
    .setDescription("Teslo shop endpoints")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  });

  app.use(compression());
  app.enableCors();
  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`);
  logger.log(`Server ready at ${await app.getUrl()}`);
}

function getIPAddress() {
  const interfaces = require("os").networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal)
        return alias.address;
    }
  }
  return "0.0.0.0";
}

bootstrap();

/* if (cluster.isMaster) {
  console.log(`Master server started on ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting`);
    cluster.fork();
  });
} else {
  console.log(`Cluster server started on ${process.pid}`);
} */
