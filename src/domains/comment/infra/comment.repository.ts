import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { now } from '@/@seedwork/utils/date';
import { CreateCommentInput } from '../dto/create-comment.input';
import { PlainComment } from '../entities/comment';
import {
  UpdateCommentDataInput,
  UpdateCommentWhereInput,
} from '../dto/update-comment.input';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: string): Promise<PlainComment | null> {
    return await this.prisma.comment.findFirst({
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

  async list(): Promise<PlainComment[]> {
    return await this.prisma.comment.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        user: true,
      },
    });
  }

  async create(
    data: CreateCommentInput & { user_id: string },
  ): Promise<PlainComment> {
    return await this.prisma.comment.create({
      data: omit(data, 'user'),
      include: {
        user: true,
      },
    });
  }

  async update(
    { id }: UpdateCommentWhereInput,
    data: UpdateCommentDataInput,
  ): Promise<PlainComment> {
    return await this.prisma.comment.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: string): Promise<PlainComment> {
    return await this.prisma.comment.update({
      where: { id },
      data: { deleted_at: now() },
      include: {
        user: true,
      },
    });
  }
}
