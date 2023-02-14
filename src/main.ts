import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Vagas-Backend')
    .setDescription('App for Vagas-Backend.')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('comment')
    .addTag('job')
    .addTag('report')
    .addTag('user')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
  console.info(`🚀🚀 App listening on port ${process.env.PORT} 🚀🚀`);
  console.info(
    `Documentation running on http://localhost:${process.env.PORT}/api 🚀🚀`,
  );
  const databse = process.env.ISLOCAL == 'true' ? 'do DOCKER' : 'da NUVEM';
  console.info(`Você esta usando o banco de dados ${databse}`);
}
bootstrap();
