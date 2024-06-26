import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AssignmentService } from './assignment.service';
import { Assignment } from './assignment.entity';

@Resolver(() => Assignment)
export class AssignmentResolver {
  constructor(private assignmentService: AssignmentService) {}

  @Query(() => [Assignment])
  async assignments() {
    return this.assignmentService.findAll();
  }

  @Mutation(() => Assignment)
  async createAssignment(
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('dueDate') dueDate: string,
    @Args('courseId') courseId: number,
  ) {
    return this.assignmentService.create(
      title,
      description,
      new Date(dueDate),
      courseId,
    );
  }
}

// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { AssignmentService } from './assignment.service';
// import { Assignment } from './assignment.entity';

// @Resolver(() => Assignment)
// export class AssignmentResolver {
//   constructor(private assignmentService: AssignmentService) {}

//   @Query(() => [Assignment])
//   async assignments() {
//     return this.assignmentService.findAll();
//   }

//   @Mutation(() => Assignment)
//   async createAssignment(
//     @Args('title') title: string,
//     @Args('description') description: string,
//     @Args('dueDate') dueDate: string,
//     @Args('courseId') courseId: number,
//   ) {
//     return this.assignmentService.create(
//       title,
//       description,
//       new Date(dueDate),
//       courseId,
//     );
//   }

//   @Mutation(() => Assignment)
//   async gradeSubmission(
//     @Args('submissionId') submissionId: number,
//     @Args('grade') grade: number,
//     @Args('feedback') feedback: string,
//   ) {
//     return this.assignmentService.gradeSubmission(
//       submissionId,
//       grade,
//       feedback,
//     );
//   }
// }
