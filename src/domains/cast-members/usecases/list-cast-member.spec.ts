import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainCastMember } from '../entities/cast-member';
import { ListCastMember } from './list-cast-member';
import { CastMemberRepository } from '../infra/cast-member.repository';
import { PrismaService } from '@/@seedwork/infra/prisma.service';

describe('List castMember use case', () => {
  let listCastMember: ListCastMember;
  let castMemberRepository: CastMemberRepository;

  beforeEach(async () => {
    castMemberRepository = new CastMemberRepository({} as PrismaService);
    listCastMember = new ListCastMember(castMemberRepository);
    jest.clearAllMocks();
  });

  it('should list two', async () => {
    jest
      .spyOn(castMemberRepository, 'list')
      .mockImplementation(async () => [plainCastMember, plainCastMember]);

    const uniqueId = new UniqueEntityId();
    const plainCastMember: PlainCastMember = {
      id: uniqueId.value,
      name: 'Some Name',
      created_at: now(),
      deleted_at: null,
    };

    const result = await listCastMember.execute();
    expect(result.length).toBe(2);
    expect(result).toMatchObject([plainCastMember, plainCastMember]);
  });

  it('should list empty array', async () => {
    jest.spyOn(castMemberRepository, 'list').mockImplementation(async () => []);

    expect(await listCastMember.execute()).toStrictEqual([]);
  });
});
