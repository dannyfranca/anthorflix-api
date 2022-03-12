import { Module } from '@nestjs/common';
import { CreateGenre } from './usecases/create-genre';
import { GenreRepository } from './infra/genre.repository';
import { ListGenre } from './usecases/list-genre';
import { UpdateGenre } from './usecases/update-genre';
import { GenreResolver } from './adapters/genre.resolver';
import { DeleteGenre } from './usecases/delete-genre';

@Module({
  imports: [],
  controllers: [],
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
