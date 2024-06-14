import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Attendance } from '../attendance/attendance.entity';

@ObjectType()
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  age: number;

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  @Field(() => [Attendance])
  attendances: Attendance[];
}
