import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fee } from './fee.entity';

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
  ) {}

  findAll(): Promise<Fee[]> {
    return this.feeRepository.find({ relations: ['user'] });
  }

  findOne(id: any): Promise<Fee> {
    // return this.feeRepository.findOne(id, { relations: ['user'] });
    return this.feeRepository.findOne(id);
  }

  create(userId: number, amount: number, dueDate: Date): Promise<Fee> {
    const newFee = this.feeRepository.create({
      user: { id: userId },
      amount,
      dueDate,
      status: 'Pending',
    });
    return this.feeRepository.save(newFee);
  }

  updateStatus(id: number, status: string): Promise<Fee> {
    return this.feeRepository.save({ id, status });
  }
}
