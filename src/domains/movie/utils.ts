import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import {
  randomDate,
  randomDesc,
  randomName,
  randomYear,
} from '@/@seedwork/utils/mock';
import { PlainMovie } from './entities/movie';

export const makeRandomPlainMovie = (): PlainMovie => {
  const uniqueId = new UniqueEntityId();
  return {
    id: uniqueId.value,
    title: randomName(),
    description: randomDesc(),
    year_launched: randomYear(),
    created_at: randomDate(),
    deleted_at: null,
  };
};
