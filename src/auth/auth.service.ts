import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    role: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name,
      email,
      role,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT secret key is not defined');
    }

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { secret: secretKey });
    return { accessToken };
  }
}
