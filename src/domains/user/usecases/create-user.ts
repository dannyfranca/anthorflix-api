import { Injectable } from '@nestjs/common';

import Username from '@/@seedwork/entities/username';
import AlreadyExistsError from '@/@seedwork/errors/already-exists.error';
import { CreateUserInput } from '../dto/create-user.input';
import { UserRepository } from '../infra/user.repository';
import { User } from '../entities/user';

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CreateUserInput) {
    if (await this.userRepository.usernameExists(dto.username))
      throw new AlreadyExistsError('Rating does not exist');

    const username = new Username(dto.username);
    const user = new User({ username });
    return this.userRepository.create(user.plain);
  }
}
