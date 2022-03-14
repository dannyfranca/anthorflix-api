import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { isDev } from './@seedwork/config';
import { GlobalModule } from './@seedwork/global.module';
import { GenreModule } from './domains/genre/genre.module';
import { CastMemberModule } from './domains/cast-members/cast-member.module';

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
    GenreModule,
    CastMemberModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
