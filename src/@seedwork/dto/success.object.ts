import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessObject {
  @Field(() => Boolean, { nullable: false })
  success: boolean;
}
