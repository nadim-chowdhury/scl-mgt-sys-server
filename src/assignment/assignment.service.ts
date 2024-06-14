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
    return this.assignmentRepository.find({ relations: ['course'] });
  }

  findOne(id: number): Promise<Assignment> {
    return this.assignmentRepository.findOne(id, { relations: ['course'] });
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
}
