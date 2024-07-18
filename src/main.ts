import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      process.env.LOCAL_URL,
      process.env.LOCAL_URL2,
      process.env.CLIENT_URL,
      process.env.SERVER_URL,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Authorization,x-apollo-operation-name,apollo-require-preflight',
    credentials: false,
  });

  await app.listen(parseInt(process.env.PORT, 10) || 8000);
}
bootstrap();
