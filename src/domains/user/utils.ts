import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { randomDate, randomUsername } from '@/@seedwork/utils/mock';
import { PlainUser } from './entities/user';

export const makeRandomPlainUser = (): PlainUser => ({
  id: new UniqueEntityId().value,
  username: randomUsername(),
  created_at: randomDate(),
  deleted_at: null,
});
