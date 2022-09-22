import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CreateCommentService, GetAllCommentsService } from './services';

@Controller('comment')
export class CommentController {
  constructor(
    private createCommentService: CreateCommentService,
    private getAllCommentsService: GetAllCommentsService,
  ) {}

  @Post()
  async createComment(@Body() data: CreateCommentDto) {
    return this.createCommentService.execute(data);
  }

  @Get()
  async getAllComments() {
    return this.getAllCommentsService.execute();
  }
}
