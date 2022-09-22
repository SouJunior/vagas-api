import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class GetCommentByIdService {
  constructor(private commentRepository: CommentRepository) {}

  async execute(id: number) {
    const commentExists = await this.commentRepository.getCommentById(id);

    if (!commentExists) {
      throw new BadRequestException(`Comment does not exist`);
    }

    return commentExists;
  }
}
