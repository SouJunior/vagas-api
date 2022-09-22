import { CommentEntity } from '../../../database/entities/comment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentEntity)
export class JobRepository extends Repository<CommentEntity> {}
