import { Field, InputType } from '@nestjs/graphql';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';

@InputType()
export class UpdateGenreWhereInput extends UniqueIdInput {}

@InputType()
export class UpdateGenreDataInput {
  @Field(() => String, { nullable: false })
  name: string;
}
