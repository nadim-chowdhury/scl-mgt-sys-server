import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { User } from './user.entity';

@Entity()
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: any) => user.fees)
  user: User;

  @Column()
  amount: number;

  @Column()
  dueDate: Date;

  @Column()
  status: string; // Pending, Paid, Overdue
}
