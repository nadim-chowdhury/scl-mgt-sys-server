import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentResolver } from './assignment.resolver';
import { Assignment } from './assignment.entity';
import { Course } from 'src/course/course.entity';
import { Submission } from 'src/submission/submission.entity';
import { AssignmentService } from './assignment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Course, Submission])],
  providers: [AssignmentService, AssignmentResolver],
  exports: [AssignmentService],
})
export class AssignmentModule {}
