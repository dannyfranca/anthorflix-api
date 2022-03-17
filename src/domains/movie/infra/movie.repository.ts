import { Injectable } from '@nestjs/common';
import {
  Movie as PrismaMovie,
  Genre as PrismGenre,
  CastMember as PrismCastMember,
  CastMemberParticipationType,
  PrismaPromise,
} from '@prisma/client';

import { PrismaService } from '@/@seedwork/infra/prisma.service';
import { now } from '@/@seedwork/utils/date';
import Name from '@/@seedwork/entities/name';
import NotFoundError from '@/@seedwork/errors/not-found.error';
import Description from '@/@seedwork/entities/description';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import Url from '@/@seedwork/entities/url';
import { Genre } from '@/domains/genre/entities/genre';
import { CastMember } from '@/domains/cast-members/entities/cast-member';
import { Thumb } from '../entities/thumb';
import { Movie } from '../entities/movie';

@Injectable()
export class MovieRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: UniqueEntityId): Promise<Movie | null> {
    const movie = await this.prisma.movie.findFirst({
      where: {
        id: id.value,
        deleted_at: null,
      },
      include: movieInclude,
    });

    if (!movie) return null;

    return await this.prismaMovieToEntity(movie, true);
  }

  async getAverageRating(movie_id: string) {
    const generalRating = await this.prisma.rating.aggregate({
      _avg: { value: true },
      where: { movie_id },
    });

    return generalRating._avg.value;
  }

  async list(): Promise<Movie[]> {
    const prismaMovies = await this.prisma.movie.findMany({
      where: {
        deleted_at: null,
      },
      include: movieInclude,
    });

    const movies: Movie[] = [];

    for (const movie of prismaMovies) {
      movies.push(await this.prismaMovieToEntity(movie, true));
    }

    return movies;
  }

  async create(
    movie: Movie,
    { genres_ids, cast_members_ids, directors_ids }: MovieRelationsInput = {},
  ): Promise<void> {
    const { genres, cast_members, directors, general_rating, ...args } =
      movie.plain;

    const transactions: PrismaPromise<any>[] = [];

    transactions.push(
      this.prisma.movie.create({
        data: {
          ...args,
          genres: mapToConnectById(genres_ids),
        },
      }),
    );

    if (cast_members_ids) {
      transactions.push(
        this.prisma.castMemberMovieParticipation.createMany({
          data: cast_members_ids.map((id) => ({
            type: CastMemberParticipationType.ACTOR,
            movie_id: movie.id.value,
            cast_member_id: id.value,
          })),
        }),
      );
    }

    if (directors_ids) {
      transactions.push(
        this.prisma.castMemberMovieParticipation.createMany({
          data: directors_ids.map((id) => ({
            type: CastMemberParticipationType.DIRECTOR,
            movie_id: movie.id.value,
            cast_member_id: id.value,
          })),
        }),
      );
    }

    await this.prisma.$transaction(transactions);
  }

  async update(
    movie: Movie,
    { genres_ids, cast_members_ids, directors_ids }: MovieRelationsInput = {},
  ): Promise<void> {
    const { genres, cast_members, directors, general_rating, id, ...args } =
      movie.plain;

    const transactions: PrismaPromise<any>[] = [];

    transactions.push(
      this.prisma.movie.update({
        where: {
          id: id,
        },
        data: {
          ...args,
          genres: mapToConnectById(genres_ids),
        },
      }),
    );

    if (cast_members_ids) {
      transactions.push(
        this.prisma.castMemberMovieParticipation.deleteMany({
          where: {
            type: CastMemberParticipationType.DIRECTOR,
            movie_id: movie.id.value,
          },
        }),
      );
      transactions.push(
        this.prisma.castMemberMovieParticipation.createMany({
          data: cast_members_ids.map((id) => ({
            type: CastMemberParticipationType.ACTOR,
            movie_id: movie.id.value,
            cast_member_id: id.value,
          })),
        }),
      );
    }

    if (directors_ids) {
      transactions.push(
        this.prisma.castMemberMovieParticipation.deleteMany({
          where: {
            type: CastMemberParticipationType.DIRECTOR,
            movie_id: movie.id.value,
          },
        }),
      );
      transactions.push(
        this.prisma.castMemberMovieParticipation.createMany({
          data: directors_ids.map((id) => ({
            type: CastMemberParticipationType.DIRECTOR,
            movie_id: movie.id.value,
            cast_member_id: id.value,
          })),
        }),
      );
    }

    await this.prisma.$transaction(transactions);
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await this.prisma.movie.update({
      where: { id: id.value },
      data: { deleted_at: now() },
      include: movieInclude,
    });
  }

  private async prismaMovieToEntity(
    movie: PrismaMovie & {
      genres: PrismGenre[];
      cast_member_participations: {
        type: CastMemberParticipationType;
        cast_member: PrismCastMember;
      }[];
    },
    calcRating = false,
  ) {
    if (!movie) throw new NotFoundError();

    const generalRating = calcRating
      ? await this.getAverageRating(movie.id)
      : undefined;

    const directors = movie.cast_member_participations.filter(
      (v) => v.type === 'DIRECTOR',
    );

    const cast_members = movie.cast_member_participations.filter(
      (v) => v.type === 'ACTOR',
    );
    return new Movie({
      id: new UniqueEntityId(movie.id),
      title: new Name(movie.title),
      description: new Description(movie.description),
      year_launched: movie.year_launched,
      thumb: movie.thumb ? new Thumb({ url: new Url(movie.thumb) }) : undefined,
      created_at: movie.created_at,
      deleted_at: movie.deleted_at,
      general_rating: generalRating,
      genres: movie.genres.map(
        ({ id, name }) =>
          new Genre({ id: new UniqueEntityId(id), name: new Name(name) }),
      ),
      directors: directors.map(
        ({ cast_member: { id, name } }) =>
          new CastMember({ id: new UniqueEntityId(id), name: new Name(name) }),
      ),
      cast_members: cast_members.map(
        ({ cast_member: { id, name } }) =>
          new CastMember({ id: new UniqueEntityId(id), name: new Name(name) }),
      ),
    });
  }
}

interface MovieRelationsInput {
  genres_ids?: UniqueEntityId[];
  cast_members_ids?: UniqueEntityId[];
  directors_ids?: UniqueEntityId[];
}

const mapToConnectById = (ids?: UniqueEntityId[]) => {
  return ids
    ? {
        connect: ids.map((id) => ({ id: id.value })),
      }
    : undefined;
};

const movieInclude = {
  genres: true,
  cast_member_participations: {
    select: {
      cast_member: true,
      type: true,
    },
  },
};
