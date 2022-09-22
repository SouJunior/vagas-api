import { CreateCommentDto } from './../dtos/create-comment.dto';
import { CommentEntity } from '../../../database/entities/comment.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateCommentDto } from '../dtos/update-comment.dto';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(data: CreateCommentDto): Promise<CommentEntity> {
    return this.save(data);
  }

  async getAllComments(): Promise<CommentEntity[]> {
    return this.find({ desativated_at: null });
  }

  async getCommentById(id: number): Promise<CommentEntity> {
    return this.findOne(id, { where: { desativated_at: null } });
  }

  async updateComment(id: number, data: UpdateCommentDto) {
    const comment = await this.findOne(id);

    return this.save({
      ...comment,
      ...data,
    });
  }

  async deleteComment(id: number): Promise<object> {
    await this.update(id, { desativated_at: new Date() });

    return { message: 'Comment deleted successfully' };
  }
}
