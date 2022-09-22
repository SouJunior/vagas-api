import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class GetAllCommentsService {
  constructor(private commentRepository: CommentRepository) {}

  async execute() {
    const comments = await this.commentRepository.getAllComments();

    if (comments.length <= 0) {
      return { message: 'No comments' };
    }

    return comments;
  }
}
