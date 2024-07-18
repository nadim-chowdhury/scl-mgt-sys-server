import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { Payment } from './payment.entity';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { Fee } from 'src/fee/fee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Fee]), InvoiceModule],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}
