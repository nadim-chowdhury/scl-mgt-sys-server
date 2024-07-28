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
    const { email, password } = loginInput;
    const user = await this.userService.validateUser(email, password);
    if (user) {
      const payload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    }
    throw new Error('Invalid credentials');
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async profile(@Args('email') email: string): Promise<User | undefined> {
    return this.userService.findOne(email);
  }
}
