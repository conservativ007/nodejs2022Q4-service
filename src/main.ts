import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';

dotenv.config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // in this place we validete incoming body

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const PATH = join(process.cwd() + '/doc/openapi.json');
  const openApi = await readFile(PATH);
  const correctedOpenApi = JSON.parse(openApi.toString());

  SwaggerModule.setup('api', app, correctedOpenApi);

  await app.listen(PORT);
  console.log(`Server is listening on ${PORT} PORT`);
}
bootstrap();
