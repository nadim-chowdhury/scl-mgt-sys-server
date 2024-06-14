import { Assignment } from 'src/assignment/assignment.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Assignment } from './assignment.entity';
// import { User } from './user.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment, (assignment: any) => assignment.submissions)
  assignment: Assignment;

  @ManyToOne(() => User, (user: any) => user.submissions)
  student: User;

  @Column()
  content: string;

  @Column()
  submittedAt: Date;
}

// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Assignment } from './assignment.entity';
// import { User } from './user.entity';

// @Entity()
// export class Submission {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Assignment, (assignment) => assignment.submissions)
//   assignment: Assignment;

//   @ManyToOne(() => User, (user) => user.submissions)
//   student: User;

//   @Column()
//   content: string;

//   @Column({ nullable: true })
//   grade: number;

//   @Column({ nullable: true })
//   feedback: string;

//   @Column()
//   submittedAt: Date;
// }
