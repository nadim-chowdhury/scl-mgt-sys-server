import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private attendanceService: AttendanceService) {}

  @Query(() => [Attendance])
  async attendances() {
    return this.attendanceService.findAll();
  }

  @Mutation(() => Attendance)
  async markAttendance(
    @Args('classId') classId: number,
    @Args('studentId') studentId: number,
    @Args('date') date: string,
    @Args('status') status: string,
  ) {
    return this.attendanceService.create(classId, studentId, date, status);
  }
}
