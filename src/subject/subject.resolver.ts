import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private subjectService: SubjectService) {}

  @Query(() => [Subject])
  async subjects() {
    return this.subjectService.findAll();
  }

  @Mutation(() => Subject)
  async createSubject(
    @Args('name') name: string,
    @Args('classId') classId: number,
  ) {
    return this.subjectService.create(name, classId);
  }
}
