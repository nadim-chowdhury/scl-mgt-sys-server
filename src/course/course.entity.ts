import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Assignment } from './assignment.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments: Assignment[];
}
