import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { CastMember, CastMemberType, PlainCastMember } from './cast-member';
import Name from '@/@seedwork/entities/name';

const strName = 'John Doe';

describe('Cast member Tests', () => {
  test('cast member constructor', () => {
    const name = new Name(strName);
    let castMember = new CastMember({ name });
    let created_at: Date;

    const props = omit(castMember.plain, 'created_at');
    expect(props).toMatchObject({
      name: strName,
      type: CastMemberType.ACTOR,
    } as PlainCastMember);
    expect(castMember.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    castMember = new CastMember({
      name,
      type: CastMemberType.DIRECTOR,
      created_at,
    });
    expect(castMember.plain).toMatchObject({
      name: strName,
      type: CastMemberType.DIRECTOR,
      created_at,
      deleted_at: null,
    } as PlainCastMember);

    created_at = new Date();
    castMember = new CastMember({
      name: new Name('Another CastMember'),
      type: CastMemberType.ACTOR,
      created_at,
    });
    expect(castMember.plain).toMatchObject({
      name: 'Another CastMember',
      type: CastMemberType.ACTOR,
      created_at,
    });
  });

  test('cast member getters', () => {
    const name = new Name(strName);
    let castMember: CastMember;
    const created_at = new Date();
    const deleted_at = new Date();

    castMember = new CastMember({ name, deleted_at });
    expect(castMember.name.value).toBe(strName);
    expect(castMember.type).toBe(CastMemberType.ACTOR);
    expect(castMember.created_at).toBeInstanceOf(Date);
    expect(castMember.deleted_at).toBeInstanceOf(Date);

    castMember = new CastMember({ name, type: CastMemberType.ACTOR });
    expect(castMember.type).toBe(CastMemberType.ACTOR);

    castMember = new CastMember({
      name,
      type: CastMemberType.DIRECTOR,
    });
    expect(castMember.type).toBe(CastMemberType.DIRECTOR);

    castMember = new CastMember({ name, created_at });
    expect(castMember.created_at).toBe(created_at);
    expect(castMember.deleted_at).toBeNull();
  });

  test('id field', () => {
    const name = new Name(strName);
    let castMember: CastMember;
    const uniqueId = new UniqueEntityId();

    castMember = new CastMember({ name });
    expect(castMember.id).toBeInstanceOf(UniqueEntityId);

    castMember = new CastMember({ name, id: uniqueId });
    expect(castMember.id).toBeInstanceOf(UniqueEntityId);
    expect(castMember.id).toBe(uniqueId);
    expect(castMember.id.value).toBe(uniqueId.value);
  });
});
