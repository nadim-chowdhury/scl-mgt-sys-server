import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { Course } from './course.entity';
import { Assignment } from 'src/assignment/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Assignment])],
  providers: [CourseService, CourseResolver],
  exports: [CourseService],
})
export class CourseModule {}
