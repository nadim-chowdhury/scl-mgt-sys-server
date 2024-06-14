import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  findOne(id: any): Promise<Subject> {
    return this.subjectRepository.findOne(id);
  }

  async create(name: string, classId: number): Promise<Subject> {
    const newSubject = this.subjectRepository.create({
      name,
      class: { id: classId },
    });
    return this.subjectRepository.save(newSubject);
  }
}
