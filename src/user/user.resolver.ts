import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { LoginInput, CreateUserInput } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

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
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => String)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<string> {
    const { username, password } = loginInput;
    const user = await this.userService.validateUser(username, password);
    if (user) {
      const payload = { username: user.username, sub: user.id };
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
