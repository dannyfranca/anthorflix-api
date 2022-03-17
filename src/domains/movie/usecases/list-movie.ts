import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../infra/movie.repository';

@Injectable()
export class ListMovie {
  constructor(private movieRepository: MovieRepository) {}

  async execute() {
    return this.movieRepository.list().then((v) => v.map((e) => e.plain));
  }
}
