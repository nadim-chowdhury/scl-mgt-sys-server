import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Query(() => [Payment])
  async payments() {
    return this.paymentService.findAll();
  }

  @Mutation(() => Payment)
  async createPayment(
    @Args('feeId') feeId: number,
    @Args('amount') amount: number,
    @Args('method') method: string,
  ) {
    return this.paymentService.create(feeId, amount, method);
  }
}

// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { PaymentService } from './payment.service';
// import { Payment } from './payment.entity';

// @Resolver(() => Payment)
// export class PaymentResolver {
//   constructor(private paymentService: PaymentService) {}

//   @Query(() => [Payment])
//   async payments() {
//     return this.paymentService.findAll();
//   }

//   @Mutation(() => Payment)
//   async createPayment(
//     @Args('feeId') feeId: number,
//     @Args('amount') amount: number,
//     @Args('method') method: string,
//   ) {
//     return this.paymentService.create(feeId, amount, method);
//   }
// }
