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

// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   OneToMany,
// } from 'typeorm';
// import { Course } from './course.entity';
// import { Submission } from './submission.entity';

// @Entity()
// export class Assignment {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   description: string;

//   @Column()
//   dueDate: Date;

//   @ManyToOne(() => Course, (course) => course.assignments)
//   course: Course;

//   @OneToMany(() => Submission, (submission) => submission.assignment)
//   submissions: Submission[];
// }