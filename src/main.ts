import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Calculator API')
    .setDescription('The calculator API description')
    .setVersion('1.0')
    .addTag('calculator')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(process.env.CORS_ORIGIN);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'POST',
    allowedHeaders: 'Content-Type',
  });

  await app.listen(3000);
}
bootstrap();
