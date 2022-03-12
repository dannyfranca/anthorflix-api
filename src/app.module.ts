import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { GenreModule } from './domains/genre/genre.module';
import { GlobalModule } from './@seedwork/global.module';
import { isDev } from './@seedwork/config';

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
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
