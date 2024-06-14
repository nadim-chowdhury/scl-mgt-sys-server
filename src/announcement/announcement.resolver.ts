import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AnnouncementService } from './announcement.service';
import { Announcement } from './announcement.entity';

@Resolver(() => Announcement)
export class AnnouncementResolver {
  constructor(private announcementService: AnnouncementService) {}

  @Query(() => [Announcement])
  async announcements() {
    return this.announcementService.findAll();
  }

  @Mutation(() => Announcement)
  async createAnnouncement(
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.announcementService.create(title, content);
  }
}
