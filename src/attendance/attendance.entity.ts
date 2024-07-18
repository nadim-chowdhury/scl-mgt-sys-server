import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Class } from 'src/class/class.entity';
import { Student } from 'src/student/student.entity';

@ObjectType()
@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Student, (student) => student.attendances)
  @Field(() => Student)
  student: Student;

  @ManyToOne(() => Class, (classEntity: any) => classEntity.attendances)
  @Field(() => Class)
  class: Class;

  @Column()
  @Field()
  date: Date;

  @Column()
  @Field()
  status: string;
}
