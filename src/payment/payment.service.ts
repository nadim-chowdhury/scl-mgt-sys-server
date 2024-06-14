import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['fee'] });
  }

  create(feeId: number, amount: number, method: string): Promise<Payment> {
    const newPayment = this.paymentRepository.create({
      fee: { id: feeId },
      amount,
      method,
    });
    return this.paymentRepository.save(newPayment);
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Payment } from './payment.entity';
// import { InvoiceService } from './invoice.service';

// @Injectable()
// export class PaymentService {
//   constructor(
//     @InjectRepository(Payment)
//     private paymentRepository: Repository<Payment>,
//     private invoiceService: InvoiceService,
//   ) {}

//   async findAll(): Promise<Payment[]> {
//     return this.paymentRepository.find({ relations: ['fee', 'fee.user'] });
//   }

//   async create(
//     feeId: number,
//     amount: number,
//     method: string,
//   ): Promise<Payment> {
//     const newPayment = this.paymentRepository.create({
//       fee: { id: feeId },
//       amount,
//       method,
//     });
//     const payment = await this.paymentRepository.save(newPayment);
//     await this.invoiceService.create(payment.fee.user.id, payment.id, amount);
//     return payment;
//   }
// }
