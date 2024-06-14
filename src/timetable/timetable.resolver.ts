import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimetableService } from './timetable.service';
import { Timetable } from './timetable.entity';

@Resolver(() => Timetable)
export class TimetableResolver {
  constructor(private timetableService: TimetableService) {}

  @Query(() => [Timetable])
  async timetables() {
    return this.timetableService.findAll();
  }

  @Mutation(() => Timetable)
  async createTimetable(
    @Args('classId') classId: number,
    @Args('subjectId') subjectId: number,
    @Args('day') day: string,
    @Args('startTime') startTime: string,
    @Args('endTime') endTime: string,
  ) {
    return this.timetableService.create(
      classId,
      subjectId,
      day,
      startTime,
      endTime,
    );
  }
}
