import { Injectable } from '@nestjs/common';
import { CastMemberRepository } from '../infra/cast-member.repository';

@Injectable()
export class ListCastMember {
  constructor(private castMemberRepository: CastMemberRepository) {}

  async execute() {
    return this.castMemberRepository.list();
  }
}
