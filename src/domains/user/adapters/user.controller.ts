import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { ErrorsInterceptor } from '@/@seedwork/errors/error.interceptor';
import { CreateUserInput } from '../dto/create-user.input';
import { CreateUser } from '../usecases/create-user';
import { DeleteUser } from '../usecases/delete-user';
import { ListUser } from '../usecases/list-user';

@UseInterceptors(ErrorsInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private readonly listUserUseCase: ListUser,
    private readonly createUserUseCase: CreateUser,
    private readonly deleteUserUseCase: DeleteUser,
  ) {}

  @Get()
  async listUsers() {
    return this.listUserUseCase.execute();
  }

  @Post()
  async createUser(@Body() data: CreateUserInput) {
    return this.createUserUseCase.execute(data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.deleteUserUseCase.execute({ id });
  }
}
