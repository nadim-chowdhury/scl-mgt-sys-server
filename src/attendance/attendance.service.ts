import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find();
  }

  create(
    classId: number,
    studentId: number,
    date: string,
    status: string,
  ): Promise<Attendance> {
    const newAttendance = this.attendanceRepository.create({
      class: { id: classId },
      student: { id: studentId },
      date,
      status,
    });
    return this.attendanceRepository.save(newAttendance);
  }
}
