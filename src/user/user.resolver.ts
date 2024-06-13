import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { LoginInput, CreateUserInput } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => User)
  async register(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => String)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<string> {
    const { username, password } = loginInput;
    const user = await this.userService.validateUser(username, password);
    if (user) {
      const payload = { username: user.name, sub: user.id };
      return this.jwtService.sign(payload);
    }
    throw new Error('Invalid credentials');
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async profile(@Args('username') username: string): Promise<User | undefined> {
    return this.userService.findOne(username);
  }
}
