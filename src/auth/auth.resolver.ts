import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => User)
  async register(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('role') role: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.authService.register(name, email, role, password);
  }

  @Mutation((returns) => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const { accessToken } = await this.authService.login(email, password);
    return accessToken;
  }
}
