import { Field, InputType } from '@nestjs/graphql';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';

@InputType()
export class UpdateCommentWhereInput extends UniqueIdInput {}

@InputType()
export class UpdateCommentDataInput {
  @Field(() => String, { nullable: true })
  content?: string;
}
