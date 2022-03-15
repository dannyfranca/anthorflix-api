import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Int, { nullable: false })
  year_launched: number;
}
