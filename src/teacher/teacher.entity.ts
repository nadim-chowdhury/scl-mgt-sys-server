import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Class } from '../class/class.entity';

@ObjectType()
@Entity()
export class Teacher {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field(() => [Class])
  @OneToMany(() => Class, (classEntity) => classEntity.teacher)
  classes: Class[];
}
