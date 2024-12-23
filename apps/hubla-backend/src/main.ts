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
    .setTitle('Hubla - Desafio Full Stack - Documentação da API')
    .setDescription(
      `Esta documentação detalha os endpoints da API para o Hubla Full Stack Challenge.
      \nA API é responsável por gerenciar transações financeiras relacionadas ao modelo criador-afiliado, permitindo uploads de arquivos em massa, validação de dados e operações de listagem paginada e criação manual.
      \nUse esta documentação como referência para integração e uso correto dos recursos fornecidos pela API.`,
    )
    .addBearerAuth({ type: 'http', description: 'insira o accessToken' })
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
