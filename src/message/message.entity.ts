import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @Field(() => User)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @Field(() => User)
  receiver: User;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  timestamp: Date;
}
