import { Injectable } from '@nestjs/common';
import { CreateCastMemberInput } from '../dto/create-cast-member.input';
import { CastMemberRepository } from '../infra/cast-member.repository';
import { CastMember } from '../entities/cast-member';
import Name from '@/@seedwork/entities/name';

@Injectable()
export class CreateCastMember {
  constructor(private castMemberRepository: CastMemberRepository) {}

  async execute(dto: CreateCastMemberInput) {
    const name = new Name(dto.name);
    const castMember = new CastMember({ name });
    return this.castMemberRepository.create(castMember.plain);
  }
}
