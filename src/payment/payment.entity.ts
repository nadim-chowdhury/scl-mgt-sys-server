import { Fee } from 'src/fee/fee.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
// import { Fee } from './fee.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fee, (fee: any) => fee.payments)
  fee: Fee;

  @Column()
  amount: number;

  @CreateDateColumn()
  paymentDate: Date;

  @Column()
  method: string; // e.g., Credit Card, Bank Transfer
}
