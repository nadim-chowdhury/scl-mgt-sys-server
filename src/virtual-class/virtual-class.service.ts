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
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { VirtualClass } from './virtual-class.entity';

// @Injectable()
// export class VirtualClassService {
//   constructor(
//     @InjectRepository(VirtualClass)
//     private virtualClassRepository: Repository<VirtualClass>,
//   ) {}

//   findAll(): Promise<VirtualClass[]> {
//     return this.virtualClassRepository.find({ relations: ['course'] });
//   }

//   create(
//     meetingLink: string,
//     schedule: Date,
//     courseId: number,
//   ): Promise<VirtualClass> {
//     const newVirtualClass = this.virtualClassRepository.create({
//       meetingLink,
//       schedule,
//       course: { id: courseId },
//     });
//     return this.virtualClassRepository.save(newVirtualClass);
//   }

//   updateSchedule(id: number, schedule: Date): Promise<VirtualClass> {
//     return this.virtualClassRepository.update(id, { schedule });
//   }
// }
