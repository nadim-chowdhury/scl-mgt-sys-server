import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private teacherService: TeacherService) {}

  @Query(() => [Teacher])
  async teachers() {
    return this.teacherService.findAll();
  }

  @Query(() => Teacher)
  async teacher(@Args('id') id: number) {
    return this.teacherService.findOne(id);
  }

  @Mutation(() => Teacher)
  async createTeacher(@Args('username') username: string) {
    return this.teacherService.create(username);
  }
}
