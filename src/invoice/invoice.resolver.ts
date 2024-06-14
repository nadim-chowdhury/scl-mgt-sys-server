import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private invoiceService: InvoiceService) {}

  @Query(() => [Invoice])
  async invoices() {
    return this.invoiceService.findAll();
  }

  @Mutation(() => Invoice)
  async createInvoice(
    @Args('userId') userId: number,
    @Args('paymentId') paymentId: number,
    @Args('amount') amount: number,
  ) {
    return this.invoiceService.create(userId, paymentId, amount);
  }
}
