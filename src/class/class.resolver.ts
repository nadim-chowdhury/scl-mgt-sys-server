import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClassService } from './class.service';
import { Class } from './class.entity';

@Resolver(() => Class)
export class ClassResolver {
  constructor(private classService: ClassService) {}

  @Query(() => [Class])
  async classes() {
    return this.classService.findAll();
  }

  @Mutation(() => Class)
  async createClass(@Args('name') name: string, @Args('teacherId') teacherId: number) {
    return this.classService.create(name, teacherId);
  }
}