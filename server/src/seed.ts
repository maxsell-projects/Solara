import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js'; // Nota o .js
import { DataSource } from 'typeorm';
import { User } from './users/user.entity.js'; // Nota o .js
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  // Inicializa a aplicação (sem ouvir porta http, apenas para conectar ao banco)
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  const userRepository = dataSource.getRepository(User);

  const adminEmail = 'admin@solara.com';
  const adminPassword = 'senha123'; // A tua senha desejada

  // Verifica se já existe
  const userExists = await userRepository.findOneBy({ email: adminEmail });

  if (userExists) {
    console.log('⚠️  O utilizador Admin já existe!');
  } else {
    // Encripta a senha
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(adminPassword, salt);

    // Cria o utilizador
    const newUser = userRepository.create({
      email: adminEmail,
      password: hash,
    });

    await userRepository.save(newUser);
    console.log('✅ Admin criado com sucesso!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Senha: ${adminPassword}`);
  }

  await app.close();
}

bootstrap();