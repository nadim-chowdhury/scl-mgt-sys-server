import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Assignment } from 'src/assignment/assignment.entity';
import { Student } from 'src/student/student.entity';

@ObjectType()
@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  content: string;

  @Column({ nullable: true })
  @Field(() => Float, { nullable: true })
  grade: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  feedback: string;

  @ManyToOne(() => Assignment, (assignment) => assignment.submissions)
  @Field(() => Assignment)
  assignment: Assignment;

  @ManyToOne(() => Student, (student: any) => student.submissions)
  @Field(() => Student)
  student: Student;
}
