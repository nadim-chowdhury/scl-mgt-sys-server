import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Payment } from 'src/payment/payment.entity';
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
export class Invoice {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user: any) => user.invoices)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => Float)
  amount: number;

  @CreateDateColumn()
  @Field()
  generatedAt: Date;

  @ManyToOne(() => Payment, (payment: any) => payment.invoice)
  @Field(() => Payment)
  payment: Payment;
}
