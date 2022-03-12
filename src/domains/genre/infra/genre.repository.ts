import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { CreateGenreInput } from '../dto/create-genre.input';
import { PlainGenre } from '../entities/genre';
import { now } from '@/@seedwork/utils/date';
import {
  UpdateGenreDataInput,
  UpdateGenreWhereInput,
} from '../dto/update-genre.input';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { HasCreatedAt } from '@/@seedwork/typings/has-created-at';

@Injectable()
export class GenreRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: string): Promise<PlainGenre | null> {
    return await this.prisma.genre.findFirst({
      where: {
        id,
        deleted_at: null,
      },
      take: 1,
    });
  }

  async list(): Promise<PlainGenre[]> {
    return await this.prisma.genre.findMany({
      where: {
        deleted_at: {
          not: null,
        },
      },
    });
  }

  async create(
    data: CreateGenreInput & UniqueIdInput & HasCreatedAt,
  ): Promise<PlainGenre> {
    return await this.prisma.genre.create({ data });
  }

  async update(
    { id }: UpdateGenreWhereInput,
    data: UpdateGenreDataInput,
  ): Promise<PlainGenre> {
    return await this.prisma.genre.update({ where: { id }, data });
  }

  async delete(id: string): Promise<PlainGenre> {
    return await this.prisma.genre.update({
      where: { id },
      data: { deleted_at: now() },
    });
  }
}
