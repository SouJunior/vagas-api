import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from '../jobs/repository/job.repository';
import { UserRepository } from '../user/repository/user.repository';
import { CommentController } from './comment.controller';
import { CommentRepository } from './repository/comment.repository';
import {
  CreateCommentService,
  DeleteCommentService,
  GetAllCommentsService,
  GetCommentByIdService,
  UpdateCommentService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      JobRepository,
      UserRepository,
    ]),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 4,
    }),
  ],
  controllers: [CommentController],
  providers: [
    CreateCommentService,
    GetAllCommentsService,
    GetCommentByIdService,
    UpdateCommentService,
    DeleteCommentService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class CommentModule {}
