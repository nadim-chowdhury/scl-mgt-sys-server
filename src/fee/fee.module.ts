import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeService } from './fee.service';
import { FeeResolver } from './fee.resolver';
import { Fee } from './fee.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, User])],
  providers: [FeeService, FeeResolver],
  exports: [FeeService],
})
export class FeeModule {}
