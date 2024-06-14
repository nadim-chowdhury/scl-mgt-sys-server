import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { User } from './user/user.entity';
import { Message } from './message/message.entity';
import { Announcement } from './announcement/announcement.entity';
import { Teacher } from './teacher/teacher.entity';
import { Class } from './class/class.entity';
import { SubjectModule } from './subject/subject.module';
import { Subject } from './subject/subject.entity';
import { Timetable } from './timetable/timetable.entity';
import { TimetableModule } from './timetable/timetable.module';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/attendance.entity';
import { Student } from './student/student.entity';
import { MessageModule } from './message/message.module';

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
      port: parseInt(process.env.PGPORT, 10) || 5432,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        User,
        Teacher,
        Class,
        Subject,
        Timetable,
        Student,
        Attendance,
        Message,
        // Announcement,
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ClassModule,
    TeacherModule,
    StudentModule,
    SubjectModule,
    TimetableModule,
    AttendanceModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
