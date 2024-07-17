import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      process.env.LOCAL_URL,
      process.env.CLIENT_URL,
      process.env.SERVER_URL,
    ],
    credentials: false,
  });

  await app.listen(8000);
}
bootstrap();
