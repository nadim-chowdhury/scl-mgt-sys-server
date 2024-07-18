import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AttendanceReportDto {
  @Field()
  student: string;

  @Field()
  class: string;

  @Field()
  date: string;

  @Field()
  status: string;
}
