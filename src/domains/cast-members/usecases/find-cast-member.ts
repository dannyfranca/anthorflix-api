import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import { Injectable } from '@nestjs/common';
import { CastMemberRepository } from '../infra/cast-member.repository';

@Injectable()
export class FindCastMember {
  constructor(private castMemberRepository: CastMemberRepository) {}

  async execute(id: string) {
    const uniqueId = new UniqueEntityId(id);
    const result = await this.castMemberRepository.find(uniqueId.value);
    if (!result) throw new NotFoundError('CastMember not found');
    return result;
  }
}
