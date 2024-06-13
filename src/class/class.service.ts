import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  findAll(): Promise<Class[]> {
    return this.classRepository.find();
  }

  findOne(id: any): Promise<Class> {
    return this.classRepository.findOne(id);
  }

  create(name: string, teacherId: number): Promise<Class> {
    const newClass = this.classRepository.create({
      name,
      teacher: { id: teacherId },
    });
    return this.classRepository.save(newClass);
  }
}
