import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { StudentModule } from './students/student.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
// import { User } from './auth/user.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: 5432,
      ssl: true,
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    StudentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
