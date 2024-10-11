// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: '*',
//     credentials: true,
//     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//     allowedHeaders: [
//       'Accept',
//       'Authorization',
//       'Content-Type',
//       'X-Requested-With',
//       'apollo-require-preflight',
//     ],
//   });

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//     }),
//   );

//   const port = process.env.PORT || 3000;
//   await app.listen(port);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create the Nest application
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origins and methods
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://scl-mgt-sys-client.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  });

  // Use global validation pipe to whitelist DTOs and forbid non-whitelisted properties
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );

  // Set a global prefix for all API routes
  app.setGlobalPrefix('api');

  // Swagger configuration for API documentation
  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('Flight Booking System API')
  //   .setDescription('API documentation for the Flight Booking System')
  //   .setVersion('1.0')
  //   .addBearerAuth() // Add Bearer token for authorization in Swagger
  //   .build();

  // const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  // SwaggerModule.setup('api/docs', app, swaggerDocument);

  // Listen on a port (default to 8000 if not provided in environment variables)
  await app.listen(process.env.PORT || 8000);
}

// Bootstrap the application
bootstrap();
