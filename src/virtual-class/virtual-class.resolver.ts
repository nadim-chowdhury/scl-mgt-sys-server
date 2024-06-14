import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VirtualClassService } from './virtual-class.service';
import { VirtualClass } from './virtual-class.entity';

@Resolver(() => VirtualClass)
export class VirtualClassResolver {
  constructor(private virtualClassService: VirtualClassService) {}

  @Query(() => [VirtualClass])
  async virtualClasses() {
    return this.virtualClassService.findAll();
  }

  @Mutation(() => VirtualClass)
  async createVirtualClass(
    @Args('meetingLink') meetingLink: string,
    @Args('schedule') schedule: string,
    @Args('courseId') courseId: number,
  ) {
    return this.virtualClassService.create(
      meetingLink,
      new Date(schedule),
      courseId,
    );
  }
}

// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { VirtualClassService } from './virtual-class.service';
// import { VirtualClass } from './virtual-class.entity';

// @Resolver(() => VirtualClass)
// export class VirtualClassResolver {
//   constructor(private virtualClassService: VirtualClassService) {}

//   @Query(() => [VirtualClass])
//   async virtualClasses() {
//     return this.virtualClassService.findAll();
//   }

//   @Mutation(() => VirtualClass)
//   async createVirtualClass(
//     @Args('meetingLink') meetingLink: string,
//     @Args('schedule') schedule: string,
//     @Args('courseId') courseId: number,
//   ) {
//     return this.virtualClassService.create(
//       meetingLink,
//       new Date(schedule),
//       courseId,
//     );
//   }

//   @Mutation(() => VirtualClass)
//   async updateSchedule(
//     @Args('id') id: number,
//     @Args('schedule') schedule: string,
//   ) {
//     return this.virtualClassService.updateSchedule(id, new Date(schedule));
//   }
// }