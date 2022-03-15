import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infra/user.repository';

@Injectable()
export class ListUser {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.list();
  }
}
