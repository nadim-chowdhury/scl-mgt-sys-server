import { Query, Resolver } from '@nestjs/graphql';
import { Student } from './student.entity';
import { demoStudents } from 'src/utils/demoStudents';

@Resolver(() => Student)
export class StudentResolver {
  @Query(() => [Student])
  students(): Student[] {
    return demoStudents;
  }
}
