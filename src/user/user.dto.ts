import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  role: string;
}

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
