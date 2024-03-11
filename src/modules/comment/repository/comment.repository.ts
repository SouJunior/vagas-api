import { Repository } from 'typeorm';
import { CommentsEntity } from '../../../database/entities/comments.entity';
import { handleError } from '../../../shared/utils/handle-error.util';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { CreateCommentDto } from './../dtos/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository {
  constructor(@InjectRepository(CommentsEntity) private commentsRepository: Repository<CommentsEntity>) {}

  async createComment(data: CreateCommentDto): Promise<CommentsEntity> {
    return this.commentsRepository.save(data).catch(handleError);
  }

  async getAllComments(): Promise<CommentsEntity[]> {
    return this.commentsRepository.find({ where: { desativated_at: null}}).catch(handleError);
  }

  async getCommentById(id: string): Promise<CommentsEntity> {
    return this.commentsRepository.findOneBy({id, desativated_at: null}).catch(
      handleError,
    );
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    const comment = await this.commentsRepository.findOneBy({id}).catch(handleError);

    return this.commentsRepository.save({
      ...comment,
      ...data,
    }).catch(handleError);
  }

  async deleteComment(id: string): Promise<object> {
    await this.commentsRepository.update(id, { desativated_at: new Date() }).catch(handleError);

    return { message: 'Comment deleted successfully' };
  }
}
