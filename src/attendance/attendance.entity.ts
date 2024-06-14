import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from '../student/student.entity';

@ObjectType()
@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  date: string;

  @ManyToOne(() => Student, (student) => student.attendances)
  @JoinColumn({ name: 'studentId' })
  @Field(() => Student)
  student: Student;

  @Column()
  @Field()
  studentId: number;
}
