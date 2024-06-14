import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
// import { Payment } from './payment.entity';
// import { User } from './user.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find({ relations: ['user', 'payment'] });
  }

  create(userId: number, paymentId: number, amount: number): Promise<Invoice> {
    const newInvoice = this.invoiceRepository.create({
      user: { id: userId },
      payment: { id: paymentId },
      amount,
    });
    return this.invoiceRepository.save(newInvoice);
  }
}
