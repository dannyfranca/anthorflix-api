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
import { CreateRatingInput } from '../dto/create-rating.input';
import { UpdateRatingDataInput } from '../dto/update-rating.input';
import { CreateRating } from '../usecases/create-rating';
import { DeleteRating } from '../usecases/delete-rating';
import { ListRating } from '../usecases/list-rating';
import { UpdateRating } from '../usecases/update-rating';

@UseInterceptors(ErrorsInterceptor)
@Controller('ratings')
export class RatingController {
  constructor(
    private readonly listRatingUseCase: ListRating,
    private readonly createRatingUseCase: CreateRating,
    private readonly updateRatingUseCase: UpdateRating,
    private readonly deleteRatingUseCase: DeleteRating,
  ) {}

  @Get()
  async listRatings() {
    return this.listRatingUseCase.execute();
  }

  @Post()
  async createRating(@Body() data: CreateRatingInput, user_id: string) {
    // TODO: user decorator
    return this.createRatingUseCase.execute({ ...data, user_id });
  }

  @Put(':id')
  async updateRating(
    @Param('id') id: string,
    @Body() data: UpdateRatingDataInput,
  ) {
    return this.updateRatingUseCase.execute({ id }, data);
  }

  @Delete(':id')
  async deleteRating(@Param('id') id: string) {
    return this.deleteRatingUseCase.execute({ id });
  }
}
