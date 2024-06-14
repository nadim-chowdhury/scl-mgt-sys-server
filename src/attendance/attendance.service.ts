import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Student } from '../student/student.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createAttendance(studentId: number, date: string): Promise<Attendance> {
    const student = await this.studentRepository.findOneOrFail({
      where: { id: studentId },
    });
    const newAttendance = this.attendanceRepository.create({
      student,
      date,
      studentId,
    });
    return this.attendanceRepository.save(newAttendance);
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({ relations: ['student'] });
  }
}
