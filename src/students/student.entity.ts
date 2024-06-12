import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  age: number;
}
