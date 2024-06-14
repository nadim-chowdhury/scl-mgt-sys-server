import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassService } from './class.service';
import { ClassResolver } from './class.resolver';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [TypeOrmModule.forFeature([Class]), TeacherModule],
  providers: [ClassService, ClassResolver],
})
export class ClassModule {}
