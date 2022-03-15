import { Module, OnModuleInit } from '@nestjs/common';

import { RatingResolver } from './adapters/rating.resolver';
import { RatingController } from './adapters/rating.controller';
import { RatingRepository } from './infra/rating.repository';
import { CreateRating } from './usecases/create-rating';
import { ListRating } from './usecases/list-rating';
import { UpdateRating } from './usecases/update-rating';
import { DeleteRating } from './usecases/delete-rating';
import { MovieRepository } from '../movie/infra/movie.repository';
import { UserRepository } from '../user/infra/user.repository';
import { registerErrorMappings } from './errors/register';

@Module({
  imports: [],
  controllers: [RatingController],
  providers: [
    RatingResolver,
    RatingRepository,
    MovieRepository,
    UserRepository,
    ListRating,
    CreateRating,
    UpdateRating,
    DeleteRating,
  ],
})
export class RatingModule implements OnModuleInit {
  onModuleInit() {
    registerErrorMappings();
  }
}
