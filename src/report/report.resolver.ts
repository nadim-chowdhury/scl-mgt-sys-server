import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReportService } from './report.service';

@Resolver()
export class ReportResolver {
  constructor(private reportService: ReportService) {}

  @Query(() => [Object])
  async academicPerformanceReport(@Args('courseId') courseId: number) {
    return this.reportService.getAcademicPerformanceReport(courseId);
  }

  @Query(() => [Object])
  async attendanceReport() {
    return this.reportService.getAttendanceReport();
  }

  @Query(() => Object)
  async financialReport() {
    return this.reportService.getFinancialReport();
  }
}

// import { Resolver, Query, Args } from '@nestjs/graphql';
// import { ReportService } from './report.service';

// @Resolver()
// export class ReportResolver {
//   constructor(private reportService: ReportService) {}

//   @Query(() => [Object])
//   async studentPerformanceReport(@Args('studentId') studentId: number) {
//     return this.reportService.getStudentPerformanceReport(studentId);
//   }
// }
