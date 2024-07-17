import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Fee } from 'src/fee/fee.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Fee, (fee: any) => fee.payments)
  @Field(() => Fee)
  fee: Fee;

  @Column()
  @Field(() => Float)
  amount: number;

  @CreateDateColumn()
  @Field()
  paymentDate: Date;

  @Column()
  @Field()
  method: string;
}
