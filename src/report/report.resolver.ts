import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { AcademicPerformanceReportDto } from './dto/academic-performance-report.dto';
import { FinancialReportDto } from './dto/financial-report.dto';
import { AttendanceReportDto } from './dto/attendance-report.dto';

@Resolver()
export class ReportResolver {
  constructor(private reportService: ReportService) {}

  @Query(() => [AcademicPerformanceReportDto])
  async academicPerformanceReport(@Args('courseId') courseId: number) {
    return this.reportService.getAcademicPerformanceReport(courseId);
  }

  @Query(() => [AttendanceReportDto])
  async attendanceReport() {
    return this.reportService.getAttendanceReport();
  }

  @Query(() => FinancialReportDto)
  async financialReport() {
    return this.reportService.getFinancialReport();
  }
}
