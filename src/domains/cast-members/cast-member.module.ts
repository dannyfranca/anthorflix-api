import { Module } from '@nestjs/common';

import { CastMemberResolver } from './adapters/cast-member.resolver';
import { CastMemberController } from './adapters/cast-member.controller';
import { CastMemberRepository } from './infra/cast-member.repository';
import { CreateCastMember } from './usecases/create-cast-member';
import { ListCastMember } from './usecases/list-cast-member';
import { UpdateCastMember } from './usecases/update-cast-member';
import { DeleteCastMember } from './usecases/delete-cast-member';

@Module({
  imports: [],
  controllers: [CastMemberController],
  providers: [
    CastMemberResolver,
    CastMemberRepository,
    ListCastMember,
    CreateCastMember,
    UpdateCastMember,
    DeleteCastMember,
  ],
})
export class CastMemberModule {}
