import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { Course } from 'src/course/course.entity';
import { Assignment } from 'src/assignment/assignment.entity';
import { Submission } from 'src/submission/submission.entity';
import { Fee } from 'src/fee/fee.entity';
import { Payment } from 'src/payment/payment.entity';
import { Attendance } from 'src/attendance/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      Assignment,
      Submission,
      Fee,
      Payment,
      Attendance,
    ]),
  ],
  providers: [ReportService, ReportResolver],
})
export class ReportModule {}
