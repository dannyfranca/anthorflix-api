import { Field, ID, InputType, Int } from '@nestjs/graphql';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';

@InputType()
export class UpdateMovieWhereInput extends UniqueIdInput {}

@InputType()
export class UpdateMovieDataInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  year_launched?: number;

  @Field(() => String, { nullable: true })
  thumb?: string;

  @Field(() => [ID], { nullable: true })
  genres_ids?: string[];

  @Field(() => [ID], { nullable: true })
  directors_ids?: string[];

  @Field(() => [ID], { nullable: true })
  cast_members_ids?: string[];
}
