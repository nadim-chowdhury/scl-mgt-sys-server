import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
// import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: any) => user.sentMessages)
  sender: User;

  @ManyToOne(() => User, (user: any) => user.receivedMessages)
  receiver: User;

  @Column()
  content: string;

  @CreateDateColumn()
  timestamp: Date;
}
