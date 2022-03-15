import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainRating } from '../entities/rating';
import { DeleteRating } from './delete-rating';
import { RatingRepository } from '../infra/rating.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import { makeRandomPlainRating } from '../utils';

describe('Delete rating use case', () => {
  let deleteRating: DeleteRating;
  let ratingRepository: RatingRepository;

  beforeEach(async () => {
    ratingRepository = new RatingRepository({} as PrismaService);
    deleteRating = new DeleteRating(ratingRepository);
    jest.clearAllMocks();
  });

  it('should delete', async () => {
    jest
      .spyOn(ratingRepository, 'find')
      .mockImplementation(async (id) => plainRating);
    jest
      .spyOn(ratingRepository, 'delete')
      .mockImplementation(async () => plainRating);

    const plainRating = makeRandomPlainRating();

    expect(await deleteRating.execute({ id: plainRating.id })).toMatchObject(
      plainRating,
    );
  });

  it('should throw NotFoundError', async () => {
    jest.spyOn(ratingRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(ratingRepository, 'delete')
      .mockImplementation(async () => makeRandomPlainRating());

    const uniqueId = new UniqueEntityId();

    expect(() =>
      deleteRating.execute({ id: uniqueId.value }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidUuidError', async () => {
    jest.spyOn(ratingRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(ratingRepository, 'delete')
      .mockImplementation(async () => makeRandomPlainRating());

    expect(() => deleteRating.execute({ id: '' })).rejects.toBeInstanceOf(
      InvalidUuidError,
    );
  });
});
