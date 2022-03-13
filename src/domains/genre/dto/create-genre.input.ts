import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field(() => String, { nullable: false })
  name: string;
}
