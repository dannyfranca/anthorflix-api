import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { now } from '@/@seedwork/utils/date';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { HasCreatedAt } from '@/@seedwork/typings/has-created-at';
import { CreateUserInput } from '../dto/create-user.input';
import { PlainUser } from '../entities/user';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: string): Promise<PlainUser | null> {
    return await this.prisma.user.findFirst({
      where: {
        id,
        deleted_at: null,
      },
      take: 1,
    });
  }

  async usernameExists(username: string): Promise<boolean> {
    return await this.prisma.user
      .count({
        where: {
          username,
        },
        take: 1,
      })
      .then(Boolean);
  }

  async list(): Promise<PlainUser[]> {
    return await this.prisma.user.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async create(
    data: CreateUserInput & UniqueIdInput & HasCreatedAt,
  ): Promise<PlainUser> {
    return await this.prisma.user.create({ data });
  }

  async delete(id: string): Promise<PlainUser> {
    return await this.prisma.user.update({
      where: { id },
      data: { deleted_at: now() },
    });
  }
}
