import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubmissionService } from './submission.service';
import { Submission } from './submission.entity';

@Resolver(() => Submission)
export class SubmissionResolver {
  constructor(private submissionService: SubmissionService) {}

  @Query(() => [Submission])
  async submissions() {
    return this.submissionService.findAll();
  }

  @Mutation(() => Submission)
  async createSubmission(
    @Args('content') content: string,
    @Args('assignmentId') assignmentId: number,
    @Args('studentId') studentId: number,
  ) {
    return this.submissionService.create(content, assignmentId, studentId);
  }
}
