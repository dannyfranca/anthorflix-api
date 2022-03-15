import { ListRating } from './list-rating';
import { RatingRepository } from '../infra/rating.repository';
import { makeRandomPlainRating } from '../utils';

describe('List rating use case', () => {
  let listRating: ListRating;
  let ratingRepository: RatingRepository;

  beforeEach(async () => {
    ratingRepository = new RatingRepository({} as any);
    listRating = new ListRating(ratingRepository);
    jest.clearAllMocks();
  });

  it('should list two', async () => {
    jest
      .spyOn(ratingRepository, 'list')
      .mockImplementation(async () => [plainRating1, plainRating2]);

    const plainRating1 = makeRandomPlainRating();
    const plainRating2 = makeRandomPlainRating();

    const result = await listRating.execute();
    expect(result.length).toBe(2);
    expect(result).toMatchObject([plainRating1, plainRating2]);
  });

  it('should list empty array', async () => {
    jest.spyOn(ratingRepository, 'list').mockImplementation(async () => []);

    expect(await listRating.execute()).toStrictEqual([]);
  });
});
