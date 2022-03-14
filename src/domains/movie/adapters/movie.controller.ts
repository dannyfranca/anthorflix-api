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
import { CreateMovieInput } from '../dto/create-movie.input';
import { UpdateMovieDataInput } from '../dto/update-movie.input';
import { CreateMovie } from '../usecases/create-movie';
import { DeleteMovie } from '../usecases/delete-movie';
import { ListMovie } from '../usecases/list-movie';
import { UpdateMovie } from '../usecases/update-movie';

@UseInterceptors(ErrorsInterceptor)
@Controller('movies')
export class MovieController {
  constructor(
    private readonly listMovieUseCase: ListMovie,
    private readonly createMovieUseCase: CreateMovie,
    private readonly updateMovieUseCase: UpdateMovie,
    private readonly deleteMovieUseCase: DeleteMovie,
  ) {}

  @Get()
  async listMovies() {
    return this.listMovieUseCase.execute();
  }

  @Post()
  async createMovie(@Body() data: CreateMovieInput) {
    return this.createMovieUseCase.execute(data);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() data: UpdateMovieDataInput,
  ) {
    return this.updateMovieUseCase.execute({ id }, data);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return this.deleteMovieUseCase.execute({ id });
  }
}
