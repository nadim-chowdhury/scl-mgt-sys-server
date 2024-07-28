import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from 'src/assignment/assignment.entity';
import { Attendance } from 'src/attendance/attendance.entity';
import { Course } from 'src/course/course.entity';
import { Fee } from 'src/fee/fee.entity';
import { Payment } from 'src/payment/payment.entity';
import { Submission } from 'src/submission/submission.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async getAcademicPerformanceReport(courseId: number) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['assignments', 'assignments.submissions'],
    });
    if (!course) {
      throw new Error('Course not found');
    }
    const report = course.assignments.map((assignment: any) => ({
      assignmentTitle: assignment.title,
      submissions: assignment.submissions.length,
      averageScore:
        assignment.submissions.reduce((acc, sub) => acc + (sub.grade || 0), 0) /
        (assignment.submissions.length || 1),
    }));

    return report;
  }

  async getAttendanceReport() {
    const attendances = await this.attendanceRepository.find({
      relations: ['student', 'class'],
    });
    const report = attendances.map((attendance: any) => ({
      student: attendance.student.username,
      class: attendance.class.name,
      date: attendance.date,
      status: attendance.status,
    }));
    return report;
  }

  async getFinancialReport() {
    const fees = await this.feeRepository.find({ relations: ['user'] });
    const payments = await this.paymentRepository.find({
      relations: ['fee', 'fee.user'],
    });

    const totalFees = fees.reduce((acc, fee) => acc + fee.amount, 0);
    const totalPayments = payments.reduce(
      (acc, payment) => acc + payment.amount,
      0,
    );

    return {
      totalFees,
      totalPayments,
      outstandingAmount: totalFees - totalPayments,
    };
  }
}
