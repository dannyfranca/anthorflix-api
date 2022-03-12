import { Module } from '@nestjs/common';
import { CreateGenre } from './usecases/create-genre';
import { GenreRepository } from './infra/genre.repository';
import { ListGenre } from './usecases/list-genre';
import { UpdateGenre } from './usecases/update-genre';

@Module({
  imports: [],
  controllers: [],
  providers: [GenreRepository, ListGenre, CreateGenre, UpdateGenre],
})
export class GenreModule {}
