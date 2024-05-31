import { RolesGuard } from 'src/roles.gurd';
import { UseGuards } from '@nestjs/common';

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @UseGuards(RolesGuard)
  @Query(() => [Student])
  students(): Student[] {
    return this.studentService.findAll();
  }

  @Mutation(() => Student)
  createStudent(@Args('name') name: string, @Args('age') age: number): Student {
    const student = { id: Date.now(), name, age };
    this.studentService.create(student);
    return student;
  }
}
