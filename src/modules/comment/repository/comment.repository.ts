import { CreateCommentDto } from './../dtos/create-comment.dto';
import { CommentEntity } from '../../../database/entities/comment.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { handleError } from '../../../shared/utils/handle-error.util';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(data: CreateCommentDto): Promise<CommentEntity> {
    return this.save(data).catch(handleError);
  }

  async getAllComments(): Promise<CommentEntity[]> {
    return this.find({ desativated_at: null }).catch(handleError);
  }

  async getCommentById(id: string): Promise<CommentEntity> {
    return this.findOne(id, { where: { desativated_at: null } }).catch(
      handleError,
    );
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    const comment = await this.findOne(id).catch(handleError);

    return this.save({
      ...comment,
      ...data,
    }).catch(handleError);
  }

  async deleteComment(id: string): Promise<object> {
    await this.update(id, { desativated_at: new Date() }).catch(handleError);

    return { message: 'Comment deleted successfully' };
  }
}
