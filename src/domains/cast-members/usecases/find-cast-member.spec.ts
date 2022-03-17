import { PlainCastMember } from '../entities/cast-member';
import { FindCastMember } from './find-cast-member';
import { CastMemberRepository } from '../infra/cast-member.repository';
import { makeRandomPlainCastMember } from '../utils';
import InvalidUuidError from '@/@seedwork/errors/invalid-uuid.error';
import NotFoundError from '@/@seedwork/errors/not-found.error';

describe('Find cast member use case', () => {
  let findCastMember: FindCastMember;
  let castMemberRepository: CastMemberRepository;
  let plainCastMember: PlainCastMember;

  beforeEach(async () => {
    castMemberRepository = new CastMemberRepository({} as any);
    findCastMember = new FindCastMember(castMemberRepository);
    jest.clearAllMocks();
    plainCastMember = makeRandomPlainCastMember();
  });

  it('should find castMember', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async () => plainCastMember);

    const result = await findCastMember.execute(plainCastMember.id);
    expect(result).toStrictEqual(plainCastMember);
  });

  it('should not find castMember', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async () => null);

    expect(() => findCastMember.execute(plainCastMember.id)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should throw InvalidUniqueIdError', async () => {
    jest
      .spyOn(castMemberRepository, 'find')
      .mockImplementation(async () => plainCastMember);

    expect(() => findCastMember.execute('abc')).rejects.toThrow(
      InvalidUuidError,
    );
  });
});
