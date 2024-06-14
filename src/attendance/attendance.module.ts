import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceService } from './attendance.service';
import { Student } from '../student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student])],
  providers: [AttendanceResolver, AttendanceService],
})
export class AttendanceModule {}
