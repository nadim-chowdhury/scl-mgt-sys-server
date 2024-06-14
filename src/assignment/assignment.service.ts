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

  findOne(id: any): Promise<Assignment> {
    // return this.assignmentRepository.findOne(id, { relations: ['course'] });
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
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Assignment } from './assignment.entity';

// @Injectable()
// export class AssignmentService {
//   constructor(
//     @InjectRepository(Assignment)
//     private assignmentRepository: Repository<Assignment>,
//   ) {}

//   findAll(): Promise<Assignment[]> {
//     return this.assignmentRepository.find({
//       relations: ['course', 'submissions'],
//     });
//   }

//   findOne(id: number): Promise<Assignment> {
//     return this.assignmentRepository.findOne(id, {
//       relations: ['course', 'submissions'],
//     });
//   }

//   create(
//     title: string,
//     description: string,
//     dueDate: Date,
//     courseId: number,
//   ): Promise<Assignment> {
//     const newAssignment = this.assignmentRepository.create({
//       title,
//       description,
//       dueDate,
//       course: { id: courseId },
//     });
//     return this.assignmentRepository.save(newAssignment);
//   }

//   gradeSubmission(
//     submissionId: number,
//     grade: number,
//     feedback: string,
//   ): Promise<Assignment> {
//     return this.assignmentRepository.update(
//       { id: submissionId },
//       { grade, feedback },
//     );
//   }
// }
