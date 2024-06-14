import { Assignment } from 'src/assignment/assignment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { Assignment } from './assignment.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Assignment, (assignment: any) => assignment.course)
  assignments: Assignment[];
}
