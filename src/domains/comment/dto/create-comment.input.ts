import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { nullable: false })
  content: string;

  @Field(() => ID, { nullable: false })
  rating_id: string;
}
