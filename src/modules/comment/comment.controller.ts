import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentIdDto } from './dtos/comment-id.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import {
  CreateCommentService,
  GetAllCommentsService,
  GetCommentByIdService,
} from './services';

@Controller('comment')
export class CommentController {
  constructor(
    private createCommentService: CreateCommentService,
    private getAllCommentsService: GetAllCommentsService,
    private getCommentByIdService: GetCommentByIdService,
  ) {}

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
}
