import { EntityRepository, Repository } from 'typeorm';
import { CommentsEntity } from '../../../database/entities/comments.entity';
import { handleError } from '../../../shared/utils/handle-error.util';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { CreateCommentDto } from './../dtos/create-comment.dto';

@EntityRepository(CommentsEntity)
export class CommentRepository extends Repository<CommentsEntity> {
  async createComment(data: CreateCommentDto): Promise<CommentsEntity> {
    return this.save(data).catch(handleError);
  }

  async getAllComments(): Promise<CommentsEntity[]> {
    return this.find({ desativated_at: null }).catch(handleError);
  }

  async getCommentById(id: string): Promise<CommentsEntity> {
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
