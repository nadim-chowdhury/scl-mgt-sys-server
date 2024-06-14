import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FeeService } from './fee.service';
import { Fee } from './fee.entity';

@Resolver(() => Fee)
export class FeeResolver {
  constructor(private feeService: FeeService) {}

  @Query(() => [Fee])
  async fees() {
    return this.feeService.findAll();
  }

  @Mutation(() => Fee)
  async createFee(
    @Args('userId') userId: number,
    @Args('amount') amount: number,
    @Args('dueDate') dueDate: string,
  ) {
    return this.feeService.create(userId, amount, new Date(dueDate));
  }

  @Mutation(() => Fee)
  async updateFeeStatus(
    @Args('id') id: number,
    @Args('status') status: string,
  ) {
    return this.feeService.updateStatus(id, status);
  }
}
