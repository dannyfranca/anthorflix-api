import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { randomDate, randomDesc, randomInt } from '@/@seedwork/utils/mock';
import { makeRandomPlainUser } from '../user/utils';
import { PlainRating } from './entities/rating';

export const makeRandomPlainRating = (): PlainRating => {
  const user = makeRandomPlainUser();
  return {
    id: new UniqueEntityId().value,
    value: randomInt({ min: 1, max: 9 }),
    content: randomDesc(),
    created_at: randomDate(),
    deleted_at: null,
    user: user,
    movie_id: new UniqueEntityId().value,
    user_id: user.id,
  };
};
