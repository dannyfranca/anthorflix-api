import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { randomDate, randomDesc, randomInt } from '@/@seedwork/utils/mock';
import { makeRandomPlainUser } from '../user/utils';
import { CreateRatingInput } from './dto/create-rating.input';
import { PlainRating } from './entities/rating';

export const makeRandomPlainRating = (): PlainRating => ({
  id: new UniqueEntityId().value,
  value: randomInt({ min: 0, max: 10 }),
  content: randomDesc(),
  movie_id: new UniqueEntityId().value,
  user: makeRandomPlainUser(),
  created_at: randomDate(),
  deleted_at: null,
});

export const plainRatingToCreateInput = ({
  user,
  ...args
}: PlainRating): CreateRatingInput & { user_id: string } => ({
  ...args,
  content: args.content ?? undefined,
  user_id: user.id,
});
