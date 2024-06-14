import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({ relations: ['classes'] });
  }

  findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { id },
      relations: ['classes'],
    });
  }

  async create(username: string): Promise<Teacher> {
    const newTeacher = this.teacherRepository.create({ username });
    return this.teacherRepository.save(newTeacher);
  }
}
