import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Int, { nullable: false })
  year_launched: number;

  @Field(() => String, { nullable: true })
  thumb?: string;

  @Field(() => [ID], { nullable: true })
  genres_ids?: string[];

  @Field(() => [ID], { nullable: true })
  directors_ids?: string[];

  @Field(() => [ID], { nullable: true })
  cast_members_ids?: string[];
}
