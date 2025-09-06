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
import { CommentsEntity } from 'src/database/entities/comments.entity';
import { JobsEntity } from 'src/database/entities/jobs.entity';
import { UsersEntity } from 'src/database/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsEntity, JobsEntity, UsersEntity]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 4,
        },
      ],
    }),
  ],
  controllers: [CommentController],
  providers: [
    CommentRepository,
    JobRepository,
    UserRepository,
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
