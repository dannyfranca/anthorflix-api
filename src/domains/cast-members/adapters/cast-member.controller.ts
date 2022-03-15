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
import { CreateCastMemberInput } from '../dto/create-cast-member.input';
import { UpdateCastMemberDataInput } from '../dto/update-cast-member.input';
import { CreateCastMember } from '../usecases/create-cast-member';
import { DeleteCastMember } from '../usecases/delete-cast-member';
import { ListCastMember } from '../usecases/list-cast-member';
import { UpdateCastMember } from '../usecases/update-cast-member';

@UseInterceptors(ErrorsInterceptor)
@Controller('cast_members')
export class CastMemberController {
  constructor(
    private readonly listCastMemberUseCase: ListCastMember,
    private readonly createCastMemberUseCase: CreateCastMember,
    private readonly updateCastMemberUseCase: UpdateCastMember,
    private readonly deleteCastMemberUseCase: DeleteCastMember,
  ) {}

  @Get()
  async listCastMembers() {
    return this.listCastMemberUseCase.execute();
  }

  @Post()
  async createCastMember(@Body() data: CreateCastMemberInput) {
    return this.createCastMemberUseCase.execute(data);
  }

  @Put(':id')
  async updateCastMember(
    @Param('id') id: string,
    @Body() data: UpdateCastMemberDataInput,
  ) {
    return this.updateCastMemberUseCase.execute({ id }, data);
  }

  @Delete(':id')
  async deleteCastMember(@Param('id') id: string) {
    return this.deleteCastMemberUseCase.execute({ id });
  }
}
