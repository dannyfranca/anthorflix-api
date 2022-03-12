import { Module } from '@nestjs/common';

import { GenreResolver } from './adapters/genre.resolver';
import { GenreController } from './adapters/genre.controller';
import { GenreRepository } from './infra/genre.repository';
import { CreateGenre } from './usecases/create-genre';
import { ListGenre } from './usecases/list-genre';
import { UpdateGenre } from './usecases/update-genre';
import { DeleteGenre } from './usecases/delete-genre';

@Module({
  imports: [],
  controllers: [GenreController],
  providers: [
    GenreResolver,
    GenreRepository,
    ListGenre,
    CreateGenre,
    UpdateGenre,
    DeleteGenre,
  ],
})
export class GenreModule {}
