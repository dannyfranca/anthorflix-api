import { EntityObject } from '@/@seedwork/dto/entity.object';
import { Field, ObjectType } from '@nestjs/graphql';
import { PlainUser } from '../entities/user';

@ObjectType()
export class UserObjectType extends EntityObject implements PlainUser {
  @Field(() => String, { nullable: false })
  username: string;
}
