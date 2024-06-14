import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './timetable.entity';
import { TimetableService } from './timetable.service';
import { TimetableResolver } from './timetable.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Timetable])],
  providers: [TimetableService, TimetableResolver],
  exports: [TimetableService],
})
export class TimetableModule {}
