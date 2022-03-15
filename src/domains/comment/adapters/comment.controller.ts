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
import { CreateCommentInput } from '../dto/create-comment.input';
import { UpdateCommentDataInput } from '../dto/update-comment.input';
import { CreateComment } from '../usecases/create-comment';
import { DeleteComment } from '../usecases/delete-comment';
import { ListComment } from '../usecases/list-comment';
import { UpdateComment } from '../usecases/update-comment';

@UseInterceptors(ErrorsInterceptor)
@Controller('comments')
export class CommentController {
  constructor(
    private readonly listCommentUseCase: ListComment,
    private readonly createCommentUseCase: CreateComment,
    private readonly updateCommentUseCase: UpdateComment,
    private readonly deleteCommentUseCase: DeleteComment,
  ) {}

  @Get()
  async listComments() {
    return this.listCommentUseCase.execute();
  }

  @Post()
  async createComment(@Body() data: CreateCommentInput, user_id: string) {
    // TODO: user decorator
    return this.createCommentUseCase.execute({ ...data, user_id });
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() data: UpdateCommentDataInput,
  ) {
    return this.updateCommentUseCase.execute({ id }, data);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return this.deleteCommentUseCase.execute({ id });
  }
}
