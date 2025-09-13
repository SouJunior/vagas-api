import { IsNull, Repository } from 'typeorm';
import { CommentsEntity } from '../../../database/entities/comments.entity';
import { handleError } from '../../../shared/utils/handle-error.util';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { CreateCommentDto } from './../dtos/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentsEntity)
    private commentsRepository: Repository<CommentsEntity>,
  ) {}

  async createComment(data: CreateCommentDto): Promise<CommentsEntity> {
    return this.commentsRepository.save(data).catch(handleError);
  }

  async getAllComments(): Promise<CommentsEntity[]> {
    return this.commentsRepository
      .find({ where: { desativated_at: null } })
      .catch(handleError);
  }

  async getCommentById(id: string): Promise<CommentsEntity> {
    const comment = await this.commentsRepository
      .findOneBy({ id, desativated_at: IsNull() })
      .catch(handleError);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado ou desativado');
    }
    return comment;
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    const comment = await this.commentsRepository
      .findOneBy({ id, desativated_at: null })
      .catch(handleError);

    if (!comment) {
      throw new NotFoundException('Comentário não encontrado ou desativado');
    }

    return this.commentsRepository
      .save({
        ...comment,
        ...data,
      })
      .catch(handleError);
  }

  async deleteComment(id: string): Promise<object> {
    const result = await this.commentsRepository
      .update(id, { desativated_at: new Date() })
      .catch(handleError);

    if (!result || result.affected === 0) {
      throw new NotFoundException('Comentário não encontrado para exclusão');
    }

    return { message: 'Comment deleted successfully' };
  }
}
