import { Field, ObjectType } from '@nestjs/graphql';

import { EntityObject } from '@/@seedwork/dto/entity.object';
import { PlainUser } from '../entities/user';

@ObjectType()
export class UserObjectType extends EntityObject implements PlainUser {
  @Field(() => String, { nullable: false })
  username: string;
}
