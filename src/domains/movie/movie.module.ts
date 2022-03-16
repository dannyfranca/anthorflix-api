import { Module } from '@nestjs/common';

import { MovieResolver } from './adapters/movie.resolver';
import { MovieController } from './adapters/movie.controller';
import { MovieRepository } from './infra/movie.repository';
import { CreateMovie } from './usecases/create-movie';
import { ListMovie } from './usecases/list-movie';
import { UpdateMovie } from './usecases/update-movie';
import { DeleteMovie } from './usecases/delete-movie';
import { FindMovie } from './usecases/find-movie';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [
    MovieResolver,
    MovieRepository,
    FindMovie,
    ListMovie,
    CreateMovie,
    UpdateMovie,
    DeleteMovie,
  ],
})
export class MovieModule {}
