import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Teacher {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  age: number;
}
