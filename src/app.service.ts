import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! This Nest JS GraphQl API is developed by Nadim Chowdhury.';
  }
}
