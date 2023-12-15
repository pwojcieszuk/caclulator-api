import { Test, TestingModule } from '@nestjs/testing';
import { CalculationController } from './calculation.controller';
import { CalculationService } from './calculation.service';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('CalculationController', () => {
  let controller: CalculationController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculationController],
      providers: [CalculationService],
    }).compile();

    controller = module.get<CalculationController>(CalculationController);
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the result of the calculation', () => {
    return request(app.getHttpServer())
      .post('/calculate')
      .send({ expression: '2 + 2' })
      .expect(200)
      .expect({ result: 4 });
  });

  it('should return 400 for invalid expression', () => {
    return request(app.getHttpServer())
      .post('/calculate')
      .send({ expression: 'abcd' })
      .expect(400);
  });

  describe('should return 400 for invalid expressions', () => {
    it('should return 400 for expression with only an operator', async () => {
      await request(app.getHttpServer())
        .post('/calculate')
        .send({ expression: '+' })
        .expect(400);
    });

    it('should return 400 for expression with only * or / operator', async () => {
      await request(app.getHttpServer())
        .post('/calculate')
        .send({ expression: '*' })
        .expect(400);
      await request(app.getHttpServer())
        .post('/calculate')
        .send({ expression: '/' })
        .expect(400);
    });

    it('should return 400 for expression with * or / at the beginning', async () => {
      await request(app.getHttpServer())
        .post('/calculate')
        .send({ expression: '*1+2' })
        .expect(400);
      await request(app.getHttpServer())
        .post('/calculate')
        .send({ expression: '/1+2' })
        .expect(400);
    });

    it('should return 400 for expression with operator at the end', async () => {
      await request(app.getHttpServer())
        .post('/calculate')
        .send({ expression: '1+2+' })
        .expect(400);
    });

    it('should return 400 for expression with mixed numbers and letters', async () => {
      await request(app.getHttpServer())
        .post('/calculate')
        .send({ expression: '1a2b3' })
        .expect(400);
    });

    it('should return 400 for expression with division by zero', async () => {
      await request(app.getHttpServer())
        .post('/calculate')
        .send({ expression: '1/0' })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
