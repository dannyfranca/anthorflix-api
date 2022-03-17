import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import { UniqueIdArgs, UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { ErrorsInterceptor } from '@/@seedwork/errors/error.interceptor';
import { CreateGenreInput } from '../dto/create-genre.input';
import { GenreObjectType } from '../dto/genre.object';
import {
  UpdateGenreDataInput,
  UpdateGenreWhereInput,
} from '../dto/update-genre.input';
import { CreateGenre } from '../usecases/create-genre';
import { DeleteGenre } from '../usecases/delete-genre';
import { ListGenre } from '../usecases/list-genre';
import { UpdateGenre } from '../usecases/update-genre';
import { FindGenre } from '../usecases/find-genre';

@UseInterceptors(ErrorsInterceptor)
@Resolver(() => GenreObjectType)
export class GenreResolver {
  constructor(
    private readonly findGenreUseCase: FindGenre,
    private readonly listGenreUseCase: ListGenre,
    private readonly createGenreUseCase: CreateGenre,
    private readonly updateGenreUseCase: UpdateGenre,
    private readonly deleteGenreUseCase: DeleteGenre,
  ) {}

  @Query(() => GenreObjectType)
  async findGenre(@Args() input: UniqueIdArgs) {
    return this.findGenreUseCase.execute(input.id);
  }

  @Query(() => [GenreObjectType])
  async listGenres() {
    return this.listGenreUseCase.execute();
  }

  @Mutation(() => GenreObjectType)
  async createGenre(@Args('data') data: CreateGenreInput) {
    return this.createGenreUseCase.execute(data);
  }

  @Mutation(() => GenreObjectType)
  async updateGenre(
    @Args('where') where: UpdateGenreWhereInput,
    @Args('data') data: UpdateGenreDataInput,
  ) {
    return this.updateGenreUseCase.execute(where, data);
  }

  @Mutation(() => GenreObjectType)
  async deleteGenre(@Args('data') input: UniqueIdInput) {
    return this.deleteGenreUseCase.execute(input);
  }
}
