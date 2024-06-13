import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthUser } from './auth-user.entity';

@Resolver((of) => AuthUser)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => AuthUser)
  async register(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('role') role: string,
    @Args('password') password: string,
  ): Promise<AuthUser> {
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
