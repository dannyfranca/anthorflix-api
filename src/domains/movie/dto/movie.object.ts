import { EntityObject } from '@/@seedwork/dto/entity.object';
import { CastMemberObjectType } from '@/domains/cast-members/dto/cast-member.object';
import { GenreObjectType } from '@/domains/genre/dto/genre.object';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { PlainMovie } from '../entities/movie';

@ObjectType()
export class MovieObjectType extends EntityObject implements PlainMovie {
  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Int, { nullable: false })
  year_launched: number;

  @Field(() => Float, { nullable: true, defaultValue: null })
  general_rating: number | null;

  @Field(() => String, { nullable: true })
  thumb?: string;

  @Field(() => [GenreObjectType], { nullable: true })
  genres_ids?: GenreObjectType[];

  @Field(() => [CastMemberObjectType], { nullable: true })
  directors_ids?: CastMemberObjectType[];

  @Field(() => [CastMemberObjectType], { nullable: true })
  cast_members_ids?: CastMemberObjectType[];
}
