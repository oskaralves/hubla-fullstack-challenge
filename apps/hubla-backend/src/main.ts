import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { AppModule } from './app.module';

const environment = process.env;

async function bootstrap() {
  const port = parseInt(environment.PORT, 10) || 3000;

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.flushLogs();

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  // For Upload
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // For handle lifecycle events
  app.enableShutdownHooks();

  // For documentation
  const options = new DocumentBuilder()
    .setTitle('Hubla - Desafio Programação Full Stack - API Documentation')
    .setDescription('API description')
    .setVersion('1.2.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);
  fs.writeFileSync('src/swagger.json', JSON.stringify(document, null, 2));

  await app.listen(port);
  console.info(`Server up in port http://localhost:${port}`);
}

bootstrap();
