import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './announcement.entity';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
  ) {}

  async findAll(): Promise<Announcement[]> {
    return this.announcementRepository.find();
  }

  async create(title: string, content: string): Promise<Announcement> {
    const newAnnouncement = this.announcementRepository.create({
      title,
      content,
    });
    return this.announcementRepository.save(newAnnouncement);
  }
}
