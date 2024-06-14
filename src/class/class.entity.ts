import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';

@ObjectType()
@Entity()
export class Class {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;
}
