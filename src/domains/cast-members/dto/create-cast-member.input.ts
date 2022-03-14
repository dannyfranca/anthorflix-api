import { Field, InputType } from '@nestjs/graphql';

// import { CastMemberType } from '../entities/cast-member';

@InputType()
export class CreateCastMemberInput {
  @Field(() => String, { nullable: false })
  name: string;

  // @Field(() => CastMemberType, { nullable: true })
  // type?: CastMemberType;
}
