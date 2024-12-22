import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Transaction Type E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/transaction-types (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/transaction-types')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body.rows)).toBe(true);
  });
});
