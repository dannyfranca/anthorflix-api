import { Field, InputType, Int } from '@nestjs/graphql';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';

@InputType()
export class UpdateRatingWhereInput extends UniqueIdInput {}

@InputType()
export class UpdateRatingDataInput {
  @Field(() => Int, { nullable: true })
  value: number;

  @Field(() => String, { nullable: true })
  content: string;
}
