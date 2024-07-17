import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/course/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class VirtualClass {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  meetingLink: string;

  @Column()
  @Field()
  schedule: Date;

  @ManyToOne(() => Course, (course: any) => course.virtualClasses)
  @Field(() => Course)
  course: Course;
}
