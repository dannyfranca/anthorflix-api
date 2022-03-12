import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { PlainGenre } from '../entities/genre';
import { UniqueIdDto } from '@/@seedwork/dto/unique-id.dto';
import { now } from '@/@seedwork/utils/date';
import { UpdateGenreDto } from '../dto/update-genre.dto';

@Injectable()
export class GenreRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<PlainGenre[]> {
    return await this.prisma.genre.findMany({
      where: {
        deleted_at: {
          not: null,
        },
      },
    });
  }

  async create({ name }: CreateGenreDto): Promise<PlainGenre> {
    return await this.prisma.genre.create({ data: { name } });
  }

  async update({ id, data }: UpdateGenreDto): Promise<PlainGenre> {
    return await this.prisma.genre.update({ where: { id }, data });
  }

  async delete({ id }: UniqueIdDto): Promise<PlainGenre> {
    return await this.prisma.genre.update({
      where: { id },
      data: { deleted_at: now() },
    });
  }
}
