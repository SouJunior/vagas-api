import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class JobOwnerGuard implements CanActivate {
  constructor(private jobRepository: JobRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const jobId = request.params.id;

    if (!user || !user.id) {
      throw new ForbiddenException('User not authenticated');
    }

    const job = await this.jobRepository.findOneById(jobId);

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.company_id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to modify this job',
      );
    }

    return true;
  }
}
