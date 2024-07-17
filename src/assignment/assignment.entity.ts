import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { Submission } from 'src/submission/submission.entity';
import { Report } from 'src/report/report.entity';

@ObjectType()
@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  dueDate: Date;

  @ManyToOne(() => Course, (course) => course.assignments)
  @Field(() => Course)
  course: Course;

  @OneToMany(() => Submission, (submission) => submission.assignment)
  @Field(() => Submission, { nullable: true })
  submissions: Submission;

  @ManyToOne(() => Report, (report) => report.assignments)
  @Field(() => Report, { nullable: true })
  report: Report;
}
