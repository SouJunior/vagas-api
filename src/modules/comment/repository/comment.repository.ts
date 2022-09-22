import { CreateCommentDto } from './../dtos/create-comment.dto';
import { CommentEntity } from '../../../database/entities/comment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(data: CreateCommentDto): Promise<CommentEntity> {
    return this.save(data);
  }

  async getAllComments(): Promise<CommentEntity[]> {
    return this.find();
  }

  async getCommentById(id: number): Promise<CommentEntity> {
    return this.findOne(id);
  }
}
