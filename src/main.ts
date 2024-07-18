import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: [
    //   process.env.LOCAL_URL,
    //   process.env.LOCAL_URL2,
    //   process.env.CLIENT_URL,
    //   process.env.SERVER_URL,
    // ],
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = parseInt(process.env.PORT, 10) || 8000;
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
