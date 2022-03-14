import { Injectable } from '@nestjs/common';

import { CastMemberRepository } from '../infra/cast-member.repository';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class DeleteCastMember {
  constructor(private castMemberRepository: CastMemberRepository) {}

  async execute(dto: UniqueIdInput) {
    const uniqueId = new UniqueEntityId(dto.id);

    if (!(await this.castMemberRepository.find(uniqueId.value)))
      throw new NotFoundError('CastMember not found');

    return this.castMemberRepository.delete(dto.id);
  }
}
