import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionService } from './submission.service';
import { SubmissionResolver } from './submission.resolver';
import { Submission } from './submission.entity';
import { Assignment } from 'src/assignment/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Assignment])],
  providers: [SubmissionService, SubmissionResolver],
  exports: [SubmissionService],
})
export class SubmissionModule {}
