import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { Email } from './email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailService, EmailResolver],
  exports: [EmailService],
})
export class EmailModule {}
