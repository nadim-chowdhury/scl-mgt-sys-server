import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { demoStudents } from 'src/utils/demoStudents';

@Injectable()
export class StudentService {
  private students: Student[] = demoStudents;

  findAll(): Student[] {
    return this.students;
  }

  create(student: Student) {
    this.students.push(student);
  }
}
