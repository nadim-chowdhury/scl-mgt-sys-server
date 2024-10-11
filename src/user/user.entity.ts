import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Message } from 'src/message/message.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  // Do not expose the password field in GraphQL for security reasons
  @Column()
  password: string;

  @Field({ nullable: true }) // Mark as nullable in GraphQL if it can be missing
  @Column({ nullable: true }) // Allow null values in the database if necessary
  role?: string;

  @Field(() => [Message]) // Expose sent messages in the GraphQL schema
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @Field(() => [Message]) // Expose received messages in the GraphQL schema
  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
}
