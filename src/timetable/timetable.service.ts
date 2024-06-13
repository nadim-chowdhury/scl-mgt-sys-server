import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timetable } from './timetable.entity';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(Timetable)
    private timetableRepository: Repository<Timetable>,
  ) {}

  findAll(): Promise<Timetable[]> {
    return this.timetableRepository.find();
  }

  create(classId: number, subjectId: number, day: string, startTime: string, endTime: string): Promise<Timetable> {
    const newTimetable = this.timetableRepository.create({ class: { id: classId }, subject: { id: subjectId }, day, startTime, endTime });
    return this.timetableRepository.save(newTimetable);
  }
}