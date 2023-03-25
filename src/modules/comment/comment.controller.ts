import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CommentIdDto } from './dtos/comment-id.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import {
  CreateCommentService,
  DeleteCommentService,
  GetAllCommentsService,
  GetCommentByIdService,
  UpdateCommentService,
} from './services';

@ApiExcludeController()
@ApiTags('Comment')
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
  @ApiOperation({
    summary: 'Cadastrar um comentário.',
  })
  async createComment(@Body() data: CreateCommentDto) {
    return this.createCommentService.execute(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Encontrar todos os comentários.',
  })
  async getAllComments() {
    return this.getAllCommentsService.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um comentário por id.',
  })
  async getCommentById(@Param() { id }: CommentIdDto) {
    return this.getCommentByIdService.execute(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar um comentário por id.',
  })
  async updateComment(
    @Param() { id }: CommentIdDto,
    @Body() data: UpdateCommentDto,
  ) {
    return this.updateCommentService.execute(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um comentário por id.',
  })
  async deleteComment(@Param() { id }: CommentIdDto) {
    return this.deleteCommentService.execute(id);
  }
}
