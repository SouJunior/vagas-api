import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CreateCommentSwagger } from 'src/shared/Swagger/decorators/comment/create-comment.swagger';
import { DeleteCommentarySwagger } from 'src/shared/Swagger/decorators/comment/delete-commentary.swagger';
import { GetAllCommentariesSwagger } from 'src/shared/Swagger/decorators/comment/get-all-commentaries.swagger';
import { GetOneCommentaryByIdSwagger } from 'src/shared/Swagger/decorators/comment/get-one-commentary.swagger';
import { UpdateCommentarySwagger } from 'src/shared/Swagger/decorators/comment/update-commentary.swagger';
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
@ApiTags('Commentary')
@Controller('commentary')
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
  @CreateCommentSwagger()
  async createCommentary(@Body() data: CreateCommentDto) {
    return this.createCommentService.execute(data);
  }

  @Get()
  @GetAllCommentariesSwagger()
  async getAllCommentaries() {
    return this.getAllCommentsService.execute();
  }

  @Get(':id')
  @GetOneCommentaryByIdSwagger()
  async getCommentaryById(@Param() { id }: CommentIdDto) {
    return this.getCommentByIdService.execute(id);
  }

  @Put(':id')
  @UpdateCommentarySwagger()
  async updateCommentary(
    @Param() { id }: CommentIdDto,
    @Body() data: UpdateCommentDto,
  ) {
    return this.updateCommentService.execute(id, data);
  }

  @Delete(':id')
  @DeleteCommentarySwagger()
  async deleteCommentary(@Param() { id }: CommentIdDto) {
    return this.deleteCommentService.execute(id);
  }
}
