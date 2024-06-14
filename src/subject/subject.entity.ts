import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Class } from 'src/class/class.entity'; // Adjust the import path as per your project structure
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType() // Decorate the class with @ObjectType() decorator
export class Subject {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Class) // Specify the GraphQL type explicitly
  @ManyToOne(() => Class, (cls: any) => cls.subjects)
  // @ManyToOne(() => Class, { cascade: true })
  class: Class;
}
