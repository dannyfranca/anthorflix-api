import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';

import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import { ErrorsInterceptor } from '@/@seedwork/errors/error.interceptor';
import { CreateRatingInput } from '../dto/create-rating.input';
import { RatingObjectType } from '../dto/rating.object';
import {
  UpdateRatingDataInput,
  UpdateRatingWhereInput,
} from '../dto/update-rating.input';
import { CreateRating } from '../usecases/create-rating';
import { DeleteRating } from '../usecases/delete-rating';
import { ListRating } from '../usecases/list-rating';
import { UpdateRating } from '../usecases/update-rating';

@UseInterceptors(ErrorsInterceptor)
@Resolver(() => RatingObjectType)
export class RatingResolver {
  constructor(
    private readonly listRatingUseCase: ListRating,
    private readonly createRatingUseCase: CreateRating,
    private readonly updateRatingUseCase: UpdateRating,
    private readonly deleteRatingUseCase: DeleteRating,
  ) {}

  @Query(() => [RatingObjectType])
  async listRatings() {
    return this.listRatingUseCase.execute();
  }

  @Mutation(() => RatingObjectType)
  async createRating(@Args('data') data: CreateRatingInput, user_id: string) {
    // TODO: user decorator
    return this.createRatingUseCase.execute({ ...data, user_id });
  }

  @Mutation(() => RatingObjectType)
  async updateRating(
    @Args('where') where: UpdateRatingWhereInput,
    @Args('data') data: UpdateRatingDataInput,
  ) {
    return this.updateRatingUseCase.execute(where, data);
  }

  @Mutation(() => RatingObjectType)
  async deleteRating(@Args('data') input: UniqueIdInput) {
    return this.deleteRatingUseCase.execute(input);
  }
}
