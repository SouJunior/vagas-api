import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as crypto from 'crypto';
(global as any).crypto = crypto;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Vagas-Backend')
    .setDescription('App for Vagas-Backend.')
    .setVersion('1.1.1')
    .addBearerAuth()
    .addTag('Upload')
    .addTag('Status')
    .addTag('Auth')
    .addTag('User')
    .addTag('Company')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV == 'development') {
    SwaggerModule.setup('api', app, document);
    console.info(
      `Documentation running on http://localhost:${process.env.PORT || 3000}/api 🚀🚀`,
    );
  }

  await app.listen(process.env.PORT || 3000, () => {
    console.info(`🚀🚀 App listening on port ${process.env.PORT || 3000} 🚀🚀`);
  });
}
bootstrap();