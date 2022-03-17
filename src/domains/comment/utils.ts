import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { randomDate, randomDesc } from '@/@seedwork/utils/mock';
import { makeRandomPlainUser } from '../user/utils';
import { PlainComment } from './entities/comment';

export const makeRandomPlainComment = (): PlainComment => {
  const user = makeRandomPlainUser();
  return {
    id: new UniqueEntityId().value,
    content: randomDesc(),
    created_at: randomDate(),
    deleted_at: null,
    rating_id: new UniqueEntityId().value,
    user_id: user.id,
    user: user,
  };
};
