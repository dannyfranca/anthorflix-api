import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { CreateCastMemberInput } from '../dto/create-cast-member.input';
import { PlainCastMember } from '../entities/cast-member';
import { now } from '@/@seedwork/utils/date';
import {
  UpdateCastMemberDataInput,
  UpdateCastMemberWhereInput,
} from '../dto/update-cast-member.input';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { HasCreatedAt } from '@/@seedwork/typings/has-created-at';

@Injectable()
export class CastMemberRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: string): Promise<PlainCastMember | null> {
    return await this.prisma.castMember.findFirst({
      where: {
        id,
        deleted_at: null,
      },
      take: 1,
    });
  }

  async list(): Promise<PlainCastMember[]> {
    return await this.prisma.castMember.findMany({
      where: {
        deleted_at: {
          not: null,
        },
      },
    });
  }

  async create(
    data: CreateCastMemberInput & UniqueIdInput & HasCreatedAt,
  ): Promise<PlainCastMember> {
    return await this.prisma.castMember.create({ data });
  }

  async update(
    { id }: UpdateCastMemberWhereInput,
    data: UpdateCastMemberDataInput,
  ): Promise<PlainCastMember> {
    return await this.prisma.castMember.update({ where: { id }, data });
  }

  async delete(id: string): Promise<PlainCastMember> {
    return await this.prisma.castMember.update({
      where: { id },
      data: { deleted_at: now() },
    });
  }
}
