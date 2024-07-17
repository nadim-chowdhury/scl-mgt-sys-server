import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['assignments'] });
  }

  findOne(id: any): Promise<Course> {
    return this.courseRepository.findOne(id);
  }

  create(title: string, description: string): Promise<Course> {
    const newCourse = this.courseRepository.create({ title, description });
    return this.courseRepository.save(newCourse);
  }
}
