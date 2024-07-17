import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from './announcement.entity';
import { AnnouncementService } from './announcement.service';
import { AnnouncementResolver } from './announcement.resolver';
import { AnnouncementGateway } from './announcement.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement])],
  providers: [AnnouncementService, AnnouncementResolver, AnnouncementGateway],
})
export class AnnouncementModule {}
