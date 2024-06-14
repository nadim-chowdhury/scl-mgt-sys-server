import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './course.entity';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private courseService: CourseService) {}

  @Query(() => [Course])
  async courses() {
    return this.courseService.findAll();
  }

  @Mutation(() => Course)
  async createCourse(
    @Args('name') name: string,
    @Args('description') description: string,
  ) {
    return this.courseService.create(name, description);
  }
}
