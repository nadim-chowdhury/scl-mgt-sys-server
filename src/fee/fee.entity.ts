import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
@Entity()
export class Fee {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user: any) => user.fees)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => Float)
  amount: number;

  @Column()
  @Field()
  dueDate: Date;

  @Column()
  @Field()
  status: string;
}
