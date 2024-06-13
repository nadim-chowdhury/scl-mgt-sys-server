import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async register(
    @Args('name') name: string,
    @Args('password') password: string,
    @Args('role') role: string,
  ) {
    return this.userService.create(name, password, role);
  }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.validateUser(username, password);
    if (user) {
      return 'JWT_TOKEN';
    }
    throw new Error('Invalid credentials');
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async profile(@Args('username') username: string) {
    return this.userService.findOne(username);
  }
}
