import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { CreateMovieInput } from '../dto/create-movie.input';
import { PlainMovie } from '../entities/movie';
import { now } from '@/@seedwork/utils/date';
import {
  UpdateMovieDataInput,
  UpdateMovieWhereInput,
} from '../dto/update-movie.input';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { HasCreatedAt } from '@/@seedwork/typings/has-created-at';

@Injectable()
export class MovieRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: string): Promise<PlainMovie | null> {
    return await this.prisma.movie.findFirst({
      where: {
        id,
        deleted_at: null,
      },
      take: 1,
    });
  }

  async list(): Promise<PlainMovie[]> {
    return await this.prisma.movie.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async create(
    data: CreateMovieInput & UniqueIdInput & HasCreatedAt,
  ): Promise<PlainMovie> {
    return await this.prisma.movie.create({ data });
  }

  async update(
    { id }: UpdateMovieWhereInput,
    data: UpdateMovieDataInput,
  ): Promise<PlainMovie> {
    return await this.prisma.movie.update({ where: { id }, data });
  }

  async delete(id: string): Promise<PlainMovie> {
    return await this.prisma.movie.update({
      where: { id },
      data: { deleted_at: now() },
    });
  }
}
