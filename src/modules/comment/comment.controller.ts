import { UpdateCommentDto } from './dtos/update-comment.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentIdDto } from './dtos/comment-id.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import {
  CreateCommentService,
  DeleteCommentService,
  GetAllCommentsService,
  GetCommentByIdService,
  UpdateCommentService,
} from './services';
import { Throttle } from '@nestjs/throttler';

@Controller('comment')
export class CommentController {
  constructor(
    private createCommentService: CreateCommentService,
    private getAllCommentsService: GetAllCommentsService,
    private getCommentByIdService: GetCommentByIdService,
    private updateCommentService: UpdateCommentService,
    private deleteCommentService: DeleteCommentService,
  ) {}

  @Throttle(2, 30)
  @Post()
  async createComment(@Body() data: CreateCommentDto) {
    return this.createCommentService.execute(data);
  }

  @Get()
  async getAllComments() {
    return this.getAllCommentsService.execute();
  }

  @Get(':id')
  async getCommentById(@Param() { id }: CommentIdDto) {
    return this.getCommentByIdService.execute(+id);
  }

  @Put(':id')
  async updateComment(
    @Param() { id }: CommentIdDto,
    @Body() data: UpdateCommentDto,
  ) {
    return this.updateCommentService.execute(+id, data);
  }

  @Delete(':id')
  async deleteComment(@Param() { id }: CommentIdDto) {
    return this.deleteCommentService.execute(+id);
  }
}
