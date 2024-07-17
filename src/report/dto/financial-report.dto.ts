import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class FinancialReportDto {
  @Field(() => Float)
  totalFees: number;

  @Field(() => Float)
  totalPayments: number;

  @Field(() => Float)
  outstandingAmount: number;
}
