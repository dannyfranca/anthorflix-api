import { EntityObject } from '@/@seedwork/dto/entity.object';
import { UserObjectType } from '@/domains/user/dto/user.object';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PlainComment } from '../entities/comment';

@ObjectType()
export class CommentObjectType extends EntityObject implements PlainComment {
  @Field(() => String, { nullable: false })
  content: string;

  @Field(() => ID, { nullable: false })
  rating_id: string;

  @Field(() => ID, { nullable: false })
  user_id: string;

  @Field(() => UserObjectType, { nullable: false })
  user: UserObjectType;
}
