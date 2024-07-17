import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class AcademicPerformanceReportDto {
  @Field()
  assignmentTitle: string;

  @Field(() => Int)
  submissions: number;

  @Field(() => Float)
  averageScore: number;
}
