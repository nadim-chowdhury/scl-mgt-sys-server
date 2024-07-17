import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Assignment } from 'src/assignment/assignment.entity';
import { Report } from 'src/report/report.entity';

@ObjectType()
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @OneToMany(() => Assignment, (assignment) => assignment.course)
  @Field(() => [Assignment], { nullable: true })
  assignments: Assignment[];

  @OneToMany(() => Report, (report) => report.course)
  @Field(() => [Report], { nullable: true })
  reports: Report[];
}
