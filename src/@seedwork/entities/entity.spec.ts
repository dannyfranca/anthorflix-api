import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { Entity, PlainEntity } from './entity';

const strName = 'Entity';

describe('Entity Tests', () => {
  test('entity constructor', () => {
    let entity = new Entity({});
    let created_at: Date;
    const deleted_at = new Date();

    expect(entity.created_at).toBeInstanceOf(Date);
    expect(entity.deleted_at).toBeNull();

    created_at = new Date();
    entity = new Entity({
      created_at,
    });
    expect(entity.plain).toMatchObject({
      created_at,
      deleted_at: null,
    } as PlainEntity);

    created_at = new Date();
    entity = new Entity({
      created_at,
      deleted_at,
    });
    expect(entity.plain).toMatchObject({
      created_at,
      deleted_at,
    });
  });

  test('entity getters', () => {
    let entity: Entity;
    const created_at = new Date();
    const deleted_at = new Date();

    entity = new Entity({ deleted_at });
    expect(entity.created_at).toBeInstanceOf(Date);
    expect(entity.deleted_at).toBeInstanceOf(Date);

    entity = new Entity({ created_at });
    expect(entity.created_at).toBe(created_at);
    expect(entity.deleted_at).toBeNull();
  });

  test('id field', () => {
    let entity: Entity;
    const uniqueId = new UniqueEntityId();

    entity = new Entity({});
    expect(entity.id).toBeInstanceOf(UniqueEntityId);

    entity = new Entity({ id: uniqueId });
    expect(entity.id).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueId);
    expect(entity.id.value).toBe(uniqueId.value);
  });
});
