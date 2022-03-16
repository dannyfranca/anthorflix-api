import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { randomDate, randomName } from '@/@seedwork/utils/mock';
import { PlainCastMember } from './entities/cast-member';

export const makeRandomPlainCastMember = (): PlainCastMember => {
  return {
    id: new UniqueEntityId().value,
    name: randomName(),
    created_at: randomDate(),
    deleted_at: null,
  };
};
