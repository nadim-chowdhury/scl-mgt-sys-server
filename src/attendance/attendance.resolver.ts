import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Mutation(() => Attendance)
  async createAttendance(
    @Args('studentId') studentId: number,
    @Args('date') date: string,
  ): Promise<Attendance> {
    return this.attendanceService.createAttendance(studentId, date);
  }

  @Query(() => [Attendance])
  async attendances(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }
}
