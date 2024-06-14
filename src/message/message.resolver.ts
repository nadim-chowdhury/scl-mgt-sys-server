import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Mutation(() => Message)
  async createMessage(
    @Args('senderId') senderId: number,
    @Args('receiverId') receiverId: number,
    @Args('content') content: string,
  ): Promise<Message> {
    return this.messageService.create(senderId, receiverId, content);
  }
}
