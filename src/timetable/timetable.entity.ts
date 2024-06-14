import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Class } from 'src/class/class.entity';
import { Subject } from 'src/subject/subject.entity';

@Entity()
@ObjectType() // Decorator for GraphQL schema generation
export class Timetable {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @ManyToOne(() => Class, (cls: any) => cls.timetables)
  @Field(() => Class)
  class: Class;

  @ManyToOne(() => Subject, (subject: any) => subject.timetables)
  @Field(() => Subject)
  subject: Subject;

  @Column()
  @Field(() => String)
  day: string;

  @Column()
  @Field(() => String)
  startTime: string;

  @Column()
  @Field(() => String)
  endTime: string;
}
