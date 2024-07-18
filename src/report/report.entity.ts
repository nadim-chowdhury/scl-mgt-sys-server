import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from 'src/course/course.entity';
import { Assignment } from 'src/assignment/assignment.entity';
import { Submission } from 'src/submission/submission.entity';
import { Fee } from 'src/fee/fee.entity';
import { Payment } from 'src/payment/payment.entity';
import { Attendance } from 'src/attendance/attendance.entity';

@ObjectType()
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description: string;

  @ManyToOne(() => Course, (course: any) => course.reports, { nullable: true })
  @JoinColumn({ name: 'course_id' })
  @Field(() => Course, { nullable: true })
  course: Course;

  @OneToMany(() => Assignment, (assignment: any) => assignment.report)
  @Field(() => [Assignment], { nullable: true })
  assignments: Assignment[];

  @OneToMany(() => Submission, (submission: any) => submission.report)
  @Field(() => [Submission], { nullable: true })
  submissions: Submission[];

  @OneToMany(() => Fee, (fee: any) => fee.report)
  @Field(() => [Fee], { nullable: true })
  fees: Fee[];

  @OneToMany(() => Payment, (payment: any) => payment.report)
  @Field(() => [Payment], { nullable: true })
  payments: Payment[];

  @OneToMany(() => Attendance, (attendance: any) => attendance.report)
  @Field(() => [Attendance], { nullable: true })
  attendances: Attendance[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
