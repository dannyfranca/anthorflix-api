import { omit } from 'lodash';

import { PrismaTestController } from '@/@seedwork/infra/prisma-test-controller';
import { now } from '@/@seedwork/utils/date';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { PlainCastMember } from '../entities/cast-member';
import { CastMemberRepository } from './cast-member.repository';
import { longRunJestTimeout } from '@/@seedwork/config';
import { makeRandomPlainCastMember } from '../utils';

describe('CastMemberRepository', () => {
  const prismaTestController = new PrismaTestController();
  let castMemberRepository: CastMemberRepository;

  beforeEach(async () => {
    await prismaTestController.init();
    castMemberRepository = new CastMemberRepository(
      prismaTestController.prisma,
    );
  }, longRunJestTimeout);

  afterEach(async () => {
    await prismaTestController.destroy();
  });

  it('should create, list and delete', async () => {
    const plainCastMember = makeRandomPlainCastMember();
    const newName = 'Another Name';
    const newPlainCastMember = { ...plainCastMember, name: newName };

    expect(await castMemberRepository.find(plainCastMember.id)).toBeNull();
    expect(await castMemberRepository.create(plainCastMember)).toMatchObject(
      plainCastMember,
    );
    expect(await castMemberRepository.find(plainCastMember.id)).toMatchObject(
      plainCastMember,
    );
    expect(
      await castMemberRepository.update(
        { id: plainCastMember.id },
        { name: newName },
      ),
    ).toMatchObject(newPlainCastMember);
    expect(await castMemberRepository.find(plainCastMember.id)).toMatchObject(
      newPlainCastMember,
    );
    const deletedCastMember = await castMemberRepository.delete(
      plainCastMember.id,
    );
    expect(deletedCastMember).toMatchObject(
      omit(newPlainCastMember, 'deleted_at'),
    );
    expect(deletedCastMember.deleted_at).toBeInstanceOf(Date);
    expect(await castMemberRepository.find(plainCastMember.id)).toBeNull();

    expect(true).toBe(true);
  });

  it('should create and list two castMembers', async () => {
    const plainCastMember = makeRandomPlainCastMember();
    const plainCastMember2 = makeRandomPlainCastMember();

    await castMemberRepository.create(plainCastMember);
    await castMemberRepository.create(plainCastMember2);

    expect(await castMemberRepository.list()).toMatchObject([
      plainCastMember,
      plainCastMember2,
    ]);
  });
});
