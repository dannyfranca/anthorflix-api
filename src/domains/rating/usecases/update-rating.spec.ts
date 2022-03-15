import { UserRepository } from '@/domains/user/infra/user.repository';
import { makeRandomPlainUser } from '@/domains/user/utils';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import InvalidDescriptionError from '@/@seedwork/errors/invalid-description.error';
import { randomDesc, randomInt } from '@/@seedwork/utils/mock';
import { UpdateRating } from './update-rating';
import { makeRandomPlainRating } from '../utils';
import { RatingRepository } from '../infra/rating.repository';
import { PlainRating } from '../entities/rating';
import InvalidRatingError from '../errors/invalid-rating.error';

const newContent = randomDesc();
const newValue = randomInt({ min: 1, max: 10 });

describe('Update rating use case', () => {
  let updateRating: UpdateRating;
  let ratingRepository: RatingRepository;
  let userRepository: UserRepository;
  let plainRating: PlainRating;

  beforeEach(async () => {
    ratingRepository = new RatingRepository({} as any);
    userRepository = new UserRepository({} as any);
    updateRating = new UpdateRating(ratingRepository, userRepository);
    plainRating = makeRandomPlainRating();
    jest.clearAllMocks();
    jest
      .spyOn(userRepository, 'find')
      .mockImplementation(async (id) => makeRandomPlainUser());
  });

  it('should update', async () => {
    jest
      .spyOn(ratingRepository, 'find')
      .mockImplementation(async (id) => plainRating);
    jest
      .spyOn(ratingRepository, 'update')
      .mockImplementation(async () => plainRating);

    expect(
      await updateRating.execute(
        { id: plainRating.id },
        { content: newContent, value: newValue },
      ),
    ).toMatchObject({ ...plainRating });
  });

  it('should throw NotFoundError', async () => {
    const uniqueId = new UniqueEntityId();

    jest.spyOn(ratingRepository, 'find').mockImplementation(async () => null);
    jest
      .spyOn(ratingRepository, 'update')
      .mockImplementation(async () => makeRandomPlainRating());

    expect(() =>
      updateRating.execute({ id: uniqueId.value }, { content: newContent }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw Invalid Errors', async () => {
    const uniqueId = new UniqueEntityId();

    jest
      .spyOn(ratingRepository, 'find')
      .mockImplementation(async () => makeRandomPlainRating());
    jest
      .spyOn(ratingRepository, 'update')
      .mockImplementation(async () => makeRandomPlainRating());

    expect(() =>
      updateRating.execute({ id: 'abc' }, { content: newContent }),
    ).rejects.toBeInstanceOf(InvalidUuidError);

    expect(() =>
      updateRating.execute(
        { id: uniqueId.value },
        { content: randomDesc(5000), value: newValue },
      ),
    ).rejects.toBeInstanceOf(InvalidDescriptionError);

    expect(() =>
      updateRating.execute(
        { id: uniqueId.value },
        { value: randomInt({ min: 11, max: 15 }) },
      ),
    ).rejects.toBeInstanceOf(InvalidRatingError);
  });
});
