import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';

@Module({
  controllers: [CommentController],
})
export class CommentModule {}
