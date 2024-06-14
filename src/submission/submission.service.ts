import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './submission.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
  ) {}

  findAll(): Promise<Submission[]> {
    return this.submissionRepository.find({
      relations: ['assignment', 'student'],
    });
  }

  findOne(id: number): Promise<Submission> {
    return this.submissionRepository.findOne(id, {
      relations: ['assignment', 'student'],
    });
  }

  create(
    content: string,
    assignmentId: number,
    studentId: number,
  ): Promise<Submission> {
    const newSubmission = this.submissionRepository.create({
      content,
      submittedAt: new Date(),
      assignment: { id: assignmentId },
      student: { id: studentId },
    });
    return this.submissionRepository.save(newSubmission);
  }
}
