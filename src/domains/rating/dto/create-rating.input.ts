import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRatingInput {
  @Field(() => Int, { nullable: false })
  value: number;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => ID, { nullable: false })
  movie_id: string;
}
