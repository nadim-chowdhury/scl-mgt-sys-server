import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => Course, (course) => course.assignments)
  course: Course;
}
