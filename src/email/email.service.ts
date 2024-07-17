import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { Email } from './email.entity';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);

    const emailRecord = this.emailRepository.create({
      to,
      subject,
      text,
      sent: true,
    });
    await this.emailRepository.save(emailRecord);
  }

  async logEmail(to: string, subject: string, text: string) {
    const emailRecord = this.emailRepository.create({
      to,
      subject,
      text,
    });
    await this.emailRepository.save(emailRecord);
  }
}
