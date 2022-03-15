import { EntityObject } from '@/@seedwork/dto/entity.object';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PlainMovie } from '../entities/movie';

@ObjectType()
export class MovieObjectType extends EntityObject implements PlainMovie {
  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Int, { nullable: false })
  year_launched: number;
}
