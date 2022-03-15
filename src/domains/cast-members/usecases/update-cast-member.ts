import { Injectable } from '@nestjs/common';

import { CastMemberRepository } from '../infra/cast-member.repository';
import { CastMember } from '../entities/cast-member';
import {
  UpdateCastMemberWhereInput,
  UpdateCastMemberDataInput,
} from '../dto/update-cast-member.input';
import Name from '@/@seedwork/entities/name';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class UpdateCastMember {
  constructor(private castMemberRepository: CastMemberRepository) {}

  async execute(
    where: UpdateCastMemberWhereInput,
    data: UpdateCastMemberDataInput,
  ) {
    const uniqueId = new UniqueEntityId(where.id);
    const plainCastMember = await this.castMemberRepository.find(
      uniqueId.value,
    );

    if (!plainCastMember) throw new NotFoundError('CastMember not found');

    const nameVo = new Name(plainCastMember.name);
    const castMember = new CastMember({ id: uniqueId, name: nameVo });

    if (data.name) castMember.name.changeName(data.name);

    const { id, ...props } = castMember.plain;
    return this.castMemberRepository.update({ id }, { ...props });
  }
}
