import { Injectable } from '@nestjs/common';

import { UserRepository } from '../infra/user.repository';
import UniqueEntityId from '@/@seedwork/entities/unique-entity-id';
import { UniqueIdInput } from '@/@seedwork/dto/unique-id.input';
import NotFoundError from '@/@seedwork/errors/not-found.error';

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: UniqueIdInput) {
    const uniqueId = new UniqueEntityId(dto.id);

    if (!(await this.userRepository.find(uniqueId.value)))
      throw new NotFoundError('User not found');

    return this.userRepository.delete(dto.id);
  }
}
