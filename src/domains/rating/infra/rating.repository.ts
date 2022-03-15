import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { CreateRatingInput } from '../dto/create-rating.input';
import { PlainRating } from '../entities/rating';
import { now } from '@/@seedwork/utils/date';
import {
  UpdateRatingDataInput,
  UpdateRatingWhereInput,
} from '../dto/update-rating.input';

@Injectable()
export class RatingRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: string): Promise<PlainRating | null> {
    return await this.prisma.rating.findFirst({
      where: {
        id,
        deleted_at: null,
      },
      include: {
        user: true,
      },
      take: 1,
    });
  }

  async list(): Promise<PlainRating[]> {
    return await this.prisma.rating.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        user: true,
      },
    });
  }

  async create(
    data: CreateRatingInput & { user_id: string },
  ): Promise<PlainRating> {
    return await this.prisma.rating.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(
    { id }: UpdateRatingWhereInput,
    data: UpdateRatingDataInput,
  ): Promise<PlainRating> {
    return await this.prisma.rating.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: string): Promise<PlainRating> {
    return await this.prisma.rating.update({
      where: { id },
      data: { deleted_at: now() },
      include: {
        user: true,
      },
    });
  }
}
