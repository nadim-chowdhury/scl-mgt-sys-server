import { Payment } from 'src/payment/payment.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
// import { User } from './user.entity';
// import { Payment } from './payment.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: any) => user.invoices)
  user: User;

  @Column()
  amount: number;

  @CreateDateColumn()
  generatedAt: Date;

  @ManyToOne(() => Payment, (payment: any) => payment.invoice)
  payment: Payment;
}
