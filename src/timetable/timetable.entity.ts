import { Class } from 'src/class/class.entity';
import { Subject } from 'src/subject/subject.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Class } from './class.entity';
// import { Subject } from './subject.entity';

@Entity()
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (cls: any) => cls.timetables)
  class: Class;

  @ManyToOne(() => Subject, (subject: any) => subject.timetables)
  subject: Subject;

  @Column()
  day: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;
}
