import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from '../jobs/repository/job.resository';
import { UserRepository } from '../user/repository/user.repository';
import { CommentController } from './comment.controller';
import { CommentRepository } from './repository/comment.repository';
import { CreateCommentService, GetAllCommentsService } from './services';
import { GetCommentByIdService } from './services/get-comment-by-id.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      JobRepository,
      UserRepository,
    ]),
  ],
  controllers: [CommentController],
  providers: [
    CreateCommentService,
    GetAllCommentsService,
    GetCommentByIdService,
  ],
})
export class CommentModule {}
