import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query(() => [Message])
  async messages() {
    return this.messageService.findAll();
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('senderId') senderId: number,
    @Args('receiverId') receiverId: number,
    @Args('content') content: string,
  ) {
    return this.messageService.create(senderId, receiverId, content);
  }
}
