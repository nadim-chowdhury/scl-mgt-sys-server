import { Attendance } from 'src/attendance/attendance.entity';
import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Attendance])],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
