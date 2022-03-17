import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { isDev } from './@seedwork/config';
import { GlobalModule } from './@seedwork/global.module';
import { GenreModule } from './domains/genre/genre.module';
import { CastMemberModule } from './domains/cast-members/cast-member.module';
import { RatingModule } from './domains/rating/rating.module';
import { CommentModule } from './domains/comment/comment.module';
import { MovieModule } from './domains/movie/movie.module';
import { UserModule } from './domains/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: isDev,
      playground: isDev,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    GlobalModule,
    CastMemberModule,
    CommentModule,
    GenreModule,
    MovieModule,
    RatingModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
