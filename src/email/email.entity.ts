import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  to: string;

  @Column()
  @Field()
  subject: string;

  @Column()
  @Field()
  text: string;

  @Column({ default: false })
  @Field()
  sent: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
