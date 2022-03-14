import { Field, InputType } from '@nestjs/graphql';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
// import { CastMemberType } from '../entities/cast-member';

@InputType()
export class UpdateCastMemberWhereInput extends UniqueIdInput {}

@InputType()
export class UpdateCastMemberDataInput {
  @Field(() => String, { nullable: false })
  name: string;

  // @Field(() => CastMemberType, { nullable: true })
  // type?: CastMemberType;
}
