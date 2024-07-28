import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { User } from './user/user.entity';
import { Message } from './message/message.entity';
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
import { Announcement } from './announcement/announcement.entity';
// import { AuthUser } from './auth/auth-user.entity';
import { AnnouncementModule } from './announcement/announcement.module';
import { AssignmentModule } from './assignment/assignment.module';
import { SubmissionModule } from './submission/submission.module';
import { Assignment } from './assignment/assignment.entity';
import { Submission } from './submission/submission.entity';
import { Course } from './course/course.entity';
import { CourseModule } from './course/course.module';
import { EmailModule } from './email/email.module';
import { Email } from './email/email.entity';
import { Fee } from './fee/fee.entity';
import { FeeModule } from './fee/fee.module';
import { Invoice } from './invoice/invoice.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { Payment } from './payment/payment.entity';
import { PaymentModule } from './payment/payment.module';
import { ReportModule } from './report/report.module';
import { Report } from './report/report.entity';
import { VirtualClass } from './virtual-class/virtual-class.entity';
import { VirtualClassModule } from './virtual-class/virtual-class.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      csrfPrevention: false,
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
        Announcement,
        Assignment,
        Attendance,
        // AuthUser,
        Class,
        Course,
        Email,
        Fee,
        Invoice,
        Message,
        Payment,
        Report,
        Student,
        Subject,
        Submission,
        Teacher,
        Timetable,
        User,
        VirtualClass,
      ],
      synchronize: true,
    }),
    AnnouncementModule,
    AssignmentModule,
    AttendanceModule,
    // AuthModule,
    ClassModule,
    CourseModule,
    EmailModule,
    FeeModule,
    InvoiceModule,
    MessageModule,
    PaymentModule,
    ReportModule,
    StudentModule,
    SubjectModule,
    SubmissionModule,
    TeacherModule,
    TimetableModule,
    UserModule,
    VirtualClassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
