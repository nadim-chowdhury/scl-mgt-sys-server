import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find({
      relations: ['course', 'submissions'],
    });
  }

  findOne(id: any): Promise<Assignment> {
    return this.assignmentRepository.findOne(id);
  }

  create(
    title: string,
    description: string,
    dueDate: Date,
    courseId: number,
  ): Promise<Assignment> {
    const newAssignment = this.assignmentRepository.create({
      title,
      description,
      dueDate,
      course: { id: courseId },
    });
    return this.assignmentRepository.save(newAssignment);
  }

  async gradeSubmission(
    submissionId: any,
    grade: number,
    feedback: string,
  ): Promise<Assignment> {
    const submission = await this.assignmentRepository.findOne(submissionId);

    if (submission) {
      (submission as any).grade = grade;
      (submission as any).feedback = feedback;
      await this.assignmentRepository.save(submission);
      return (submission as any).assignment;
    }
    throw new Error('Submission not found');
  }
}
