import { Teacher } from 'src/teachers/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Teacher } from './teacher.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Teacher, (teacher: any) => teacher.classes)
  teacher: Teacher;
}
