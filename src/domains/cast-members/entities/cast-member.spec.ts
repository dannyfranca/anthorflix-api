import { omit } from 'lodash';

import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import {
  CastMember,
  CastMemberProperties,
  CastMemberType,
} from './cast-member';

const name = 'John Doe';

describe('Cast member Tests', () => {
  test('cast member constructor', () => {
    let castMember = new CastMember({ name });
    let created_at: Date;

    const props = omit(castMember.props, 'created_at');
    expect(props).toStrictEqual({
      name,
      type: CastMemberType.ACTOR,
    } as CastMemberProperties);
    expect(castMember.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    castMember = new CastMember({
      name,
      type: CastMemberType.DIRECTOR,
      created_at,
    });
    expect(castMember.props).toStrictEqual({
      name,
      type: CastMemberType.DIRECTOR,
      created_at,
    });

    created_at = new Date();
    castMember = new CastMember({
      name: 'Another CastMember',
      type: CastMemberType.ACTOR,
      created_at,
    });
    expect(castMember.props).toMatchObject({
      name: 'Another CastMember',
      type: CastMemberType.ACTOR,
      created_at,
    });
  });

  test('cast member getters', () => {
    let castMember: CastMember;
    const created_at = new Date();

    castMember = new CastMember({ name });
    expect(castMember.name).toBe(name);
    expect(castMember.type).toBe(CastMemberType.ACTOR);
    expect(castMember.created_at).toBeInstanceOf(Date);

    castMember = new CastMember({ name, type: CastMemberType.ACTOR });
    expect(castMember.type).toBe(CastMemberType.ACTOR);

    castMember = new CastMember({ name, type: CastMemberType.DIRECTOR });
    expect(castMember.type).toBe(CastMemberType.DIRECTOR);

    castMember = new CastMember({ name, created_at });
    expect(castMember.created_at).toBe(created_at);
  });

  test('id field', () => {
    let castMember: CastMember;
    const uniqueId = new UniqueEntityId();

    castMember = new CastMember({ name });
    expect(castMember.id).toBeInstanceOf(UniqueEntityId);

    castMember = new CastMember({ name }, uniqueId);
    expect(castMember.id).toBeInstanceOf(UniqueEntityId);
    expect(castMember.id).toBe(uniqueId);
    expect(castMember.id.value).toBe(uniqueId.value);
  });
});
