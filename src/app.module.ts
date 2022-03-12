import { Module } from '@nestjs/common';
import { GenreModule } from './domains/genre/genre.module';
import { GlobalModule } from './@seedwork/global.module';

@Module({
  imports: [GlobalModule, GenreModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
