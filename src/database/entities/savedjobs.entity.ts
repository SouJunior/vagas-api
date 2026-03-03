import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { JobsEntity } from './jobs.entity';

@Entity('tb_saved_jobs')
export class SavedJobsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => UsersEntity, (user) => user.savedJobs, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;

  @Index()
  @ManyToOne(() => JobsEntity, (job) => job.savedJobs, { eager: false })
  @JoinColumn({ name: 'jobId' })
  job: JobsEntity;

  @CreateDateColumn()
  savedAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  constructor(savedJob?: Partial<SavedJobsEntity>) {
    this.id = savedJob?.id;
    this.user = savedJob?.user;
    this.job = savedJob?.job;
    this.savedAt = savedJob?.savedAt;
    this.expiresAt = savedJob?.expiresAt;
  }
}
