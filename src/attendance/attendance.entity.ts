import { Class } from 'src/class/class.entity';
import { Student } from 'src/students/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (cls: any) => cls.attendances)
  class: Class;

  @ManyToOne(() => Student, (student: any) => student.attendances)
  student: Student;

  @Column()
  date: string;

  @Column()
  status: string; // Present or Absent
}
