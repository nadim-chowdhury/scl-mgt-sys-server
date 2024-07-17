import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { Invoice } from './invoice.entity';
import { User } from 'src/user/user.entity';
import { Payment } from 'src/payment/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User, Payment])],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService],
})
export class InvoiceModule {}
