import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
// import { RolesGuard } from 'src/roles.guard';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  // @UseGuards(RolesGuard)
  @Query(() => [Student])
  students(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Mutation(() => Student)
  async createStudent(
    @Args('name') name: string,
    @Args('age') age: number,
  ): Promise<Student> {
    return this.studentService.create({ name, age });
  }
}
