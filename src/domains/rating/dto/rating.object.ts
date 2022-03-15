import { EntityObject } from '@/@seedwork/dto/entity.object';
import { UserObjectType } from '@/domains/user/dto/user.object';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PlainRating } from '../entities/rating';

@ObjectType()
export class RatingObjectType extends EntityObject implements PlainRating {
  @Field(() => Int, { nullable: false })
  value: number;

  @Field(() => String, { nullable: false })
  content: string;

  @Field(() => ID, { nullable: false })
  movie_id: string;

  @Field(() => ID, { nullable: false })
  user_id: string;

  @Field(() => UserObjectType, { nullable: false })
  user: UserObjectType;
}
