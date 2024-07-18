import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VirtualClass } from './virtual-class.entity';
import { VirtualClassService } from './virtual-class.service';
import { VirtualClassResolver } from './virtual-class.resolver';
import { Course } from 'src/course/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VirtualClass, Course])],
  providers: [VirtualClassService, VirtualClassResolver],
})
export class VirtualClassModule {}
