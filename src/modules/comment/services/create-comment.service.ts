import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../modules/user/repository/user.repository';
import { JobRepository } from '../../../modules/jobs/repository/job.resository';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CreateCommentService {
  constructor(
    private commentRepository: CommentRepository,
    private jobRepository: JobRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: CreateCommentDto) {
    const { job_id, user_id } = data;

    const userExists = await this.userRepository.findOneById(user_id);

    if (!userExists) {
      throw new BadRequestException(`User does not exist`);
    }

    const jobExists = await this.jobRepository.findOneById(job_id);

    if (!jobExists) {
      throw new BadRequestException(`Job does not exist`);
    }

    return this.commentRepository.createComment(data);
  }
}
