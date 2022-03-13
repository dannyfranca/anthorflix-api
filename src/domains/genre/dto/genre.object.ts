import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PlainGenre } from '../entities/genre';

@ObjectType()
export class GenreObjectType implements PlainGenre {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Date, { nullable: false })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;
}
