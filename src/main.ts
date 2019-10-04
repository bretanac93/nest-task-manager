<<<<<<< HEAD
import * as config from 'config';
=======
>>>>>>> 61e430041922256202108d39f258dd5bfaf3ed00
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

<<<<<<< HEAD
async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('AppCore');
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || serverConfig['port'];
=======
async function bootstrap(port = 3000) {
  const logger = new Logger('AppCore');
  const app = await NestFactory.create(AppModule);
>>>>>>> 61e430041922256202108d39f258dd5bfaf3ed00
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
