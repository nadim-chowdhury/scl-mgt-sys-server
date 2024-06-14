import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({ relations: ['sender', 'receiver'] });
  }

  async create(
    senderId: number,
    receiverId: number,
    content: string,
  ): Promise<Message> {
    const newMessage = this.messageRepository.create({
      sender: { id: senderId },
      receiver: { id: receiverId },
      content,
    });
    return this.messageRepository.save(newMessage);
  }
}
