import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EntityObject {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => Date, { nullable: false })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;
}
