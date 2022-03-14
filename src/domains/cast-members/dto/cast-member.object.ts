import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PlainCastMember } from '../entities/cast-member';

@ObjectType()
export class CastMemberObjectType implements PlainCastMember {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  name: string;

  // @Field(() => CastMemberType, { nullable: false })
  // type: CastMemberType;

  @Field(() => Date, { nullable: false })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;
}
