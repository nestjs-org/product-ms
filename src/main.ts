import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger()
  logger.log("microservice product running on port: "+envs.port, 'and nats: ', envs.nats_servers)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.NATS,
    options: {
      servers: envs.nats_servers,
    },
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  await app.listen();
  logger.log("microservice product running on port: "+envs.port, 'and nats: ', envs.nats_servers)
}
bootstrap();
