import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
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
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // For handle lifecycle events
  app.enableShutdownHooks();

  // For documentation
  const options = new DocumentBuilder()
    .setTitle('Hubla - Full Stack Challenge - API Documentation')
    .setDescription(
      `This documentation details the API endpoints for the Hubla Full Stack Challenge.
      \nThe API is responsible for managing financial transactions related to the creator-affiliate model, allowing for bulk file uploads, data validation, and paginated listing and manual creation operations.
      \nUse this documentation as a reference for integration and correct use of the resources provided by the API.`,
    )
    .setVersion('1.2.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);
  fs.writeFileSync(
    path.resolve(__dirname, 'swagger.json'),
    JSON.stringify(document, null, 2),
  );

  await app.listen(port);
  console.info(`Server up in port http://localhost:${port}`);
}

bootstrap();
