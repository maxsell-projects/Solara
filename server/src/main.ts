import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // <--- Importante
import { AppModule } from './app.module.js';
import { join } from 'path';

async function bootstrap() {
  // Adiciona o tipo genérico <NestExpressApplication>
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configura a pasta estática para servir imagens
  // Isto permite acessar http://localhost:3001/uploads/nome-do-arquivo.jpg
  app.useStaticAssets(join(process.cwd(), 'server/uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3001);
  console.log(`🚀 Server is running on: http://localhost:3001`);
}
bootstrap();