import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailService } from './email.service';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean)
  async sendEmail(
    @Args('to') to: string,
    @Args('subject') subject: string,
    @Args('text') text: string,
  ): Promise<boolean> {
    await this.emailService.sendEmail(to, subject, text);
    return true;
  }

  @Mutation(() => Boolean)
  async logEmail(
    @Args('to') to: string,
    @Args('subject') subject: string,
    @Args('text') text: string,
  ): Promise<boolean> {
    await this.emailService.logEmail(to, subject, text);
    return true;
  }
}
