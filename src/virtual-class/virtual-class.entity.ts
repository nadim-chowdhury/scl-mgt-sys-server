import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class VirtualClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meetingLink: string;

  @Column()
  schedule: Date;

  @ManyToOne(() => Course, (course) => course.virtualClasses)
  course: Course;
}

// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Course } from './course.entity';

// @Entity()
// export class VirtualClass {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   meetingLink: string;

//   @Column()
//   schedule: Date;

//   @ManyToOne(() => Course, (course) => course.virtualClasses)
//   course: Course;
// }