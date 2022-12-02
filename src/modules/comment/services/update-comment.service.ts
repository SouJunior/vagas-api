import { CommentRepository } from './../repository/comment.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCommentDto } from '../dtos/update-comment.dto';

@Injectable()
export class UpdateCommentService {
  constructor(private commentRepository: CommentRepository) {}

  async execute(id: string, data: UpdateCommentDto) {
    const commentExists = await this.commentRepository.getCommentById(id);

    if (!commentExists) {
      throw new BadRequestException(`Comment does not exist`);
    }

    return this.commentRepository.updateComment(id, data);
  }
}
