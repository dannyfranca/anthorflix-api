import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { ErrorsInterceptor } from '@/@seedwork/errors/error.interceptor';
import { CreateGenreInput } from '../dto/create-genre.input';
import { UpdateGenreDataInput } from '../dto/update-genre.input';
import { CreateGenre } from '../usecases/create-genre';
import { DeleteGenre } from '../usecases/delete-genre';
import { ListGenre } from '../usecases/list-genre';
import { UpdateGenre } from '../usecases/update-genre';

@UseInterceptors(ErrorsInterceptor)
@Controller('genres')
export class GenreController {
  constructor(
    private readonly listGenreUseCase: ListGenre,
    private readonly createGenreUseCase: CreateGenre,
    private readonly updateGenreUseCase: UpdateGenre,
    private readonly deleteGenreUseCase: DeleteGenre,
  ) {}

  @Get()
  async listGenres() {
    return this.listGenreUseCase.execute();
  }

  @Post()
  async createGenre(@Body() data: CreateGenreInput) {
    return this.createGenreUseCase.execute(data);
  }

  @Put(':id')
  async updateGenre(
    @Param('id') id: string,
    @Body() data: UpdateGenreDataInput,
  ) {
    return this.updateGenreUseCase.execute({ id }, data);
  }

  @Delete(':id')
  async deleteGenre(@Param('id') id: string) {
    return this.deleteGenreUseCase.execute({ id });
  }
}
