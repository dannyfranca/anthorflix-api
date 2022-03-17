import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { randomDate, randomName } from '@/@seedwork/utils/mock';
import { PlainGenre } from './entities/genre';

export const makeRandomPlainGenre = (): PlainGenre => {
  return {
    id: new UniqueEntityId().value,
    name: randomName(),
    created_at: randomDate(),
    deleted_at: null,
  };
};
