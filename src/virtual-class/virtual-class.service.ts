import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualClass } from './virtual-class.entity';

@Injectable()
export class VirtualClassService {
  constructor(
    @InjectRepository(VirtualClass)
    private virtualClassRepository: Repository<VirtualClass>,
  ) {}

  findAll(): Promise<VirtualClass[]> {
    return this.virtualClassRepository.find({ relations: ['course'] });
  }

  create(
    meetingLink: string,
    schedule: Date,
    courseId: number,
  ): Promise<VirtualClass> {
    const newVirtualClass = this.virtualClassRepository.create({
      meetingLink,
      schedule,
      course: { id: courseId },
    });
    return this.virtualClassRepository.save(newVirtualClass);
  }

  async updateSchedule(id: any, schedule: Date): Promise<VirtualClass> {
    const virtualClass = await this.virtualClassRepository.findOne(id);
    if (!virtualClass) {
      throw new Error(`Virtual class with ID ${id} not found`);
    }
    virtualClass.schedule = schedule;
    return this.virtualClassRepository.save(virtualClass);
  }
}
