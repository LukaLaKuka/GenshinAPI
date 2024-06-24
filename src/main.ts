import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Genshin API')
    .setDescription('Complete Genshin API')
    .setVersion('1.0')
    .addTag('Genshin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}

bootstrap();
