import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import { UniqueIdArgs, UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { ErrorsInterceptor } from '@/@seedwork/errors/error.interceptor';
import { CreateMovieInput } from '../dto/create-movie.input';
import { MovieObjectType } from '../dto/movie.object';
import {
  UpdateMovieDataInput,
  UpdateMovieWhereInput,
} from '../dto/update-movie.input';
import { CreateMovie } from '../usecases/create-movie';
import { DeleteMovie } from '../usecases/delete-movie';
import { ListMovie } from '../usecases/list-movie';
import { UpdateMovie } from '../usecases/update-movie';
import { FindMovie } from '../usecases/find-movie';

@UseInterceptors(ErrorsInterceptor)
@Resolver(() => MovieObjectType)
export class MovieResolver {
  constructor(
    private readonly findMovieUseCase: FindMovie,
    private readonly listMovieUseCase: ListMovie,
    private readonly createMovieUseCase: CreateMovie,
    private readonly updateMovieUseCase: UpdateMovie,
    private readonly deleteMovieUseCase: DeleteMovie,
  ) {}

  @Query(() => MovieObjectType)
  async findMovie(@Args() input: UniqueIdArgs) {
    return this.findMovieUseCase.execute(input.id);
  }

  @Query(() => [MovieObjectType])
  async listMovies() {
    return this.listMovieUseCase.execute();
  }

  @Mutation(() => MovieObjectType)
  async createMovie(@Args('data') data: CreateMovieInput) {
    return this.createMovieUseCase.execute(data);
  }

  @Mutation(() => MovieObjectType)
  async updateMovie(
    @Args('where') where: UpdateMovieWhereInput,
    @Args('data') data: UpdateMovieDataInput,
  ) {
    return this.updateMovieUseCase.execute(where, data);
  }

  @Mutation(() => MovieObjectType)
  async deleteMovie(@Args('data') input: UniqueIdInput) {
    return this.deleteMovieUseCase.execute(input);
  }
}
