import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { JobEntity } from './jobs.entity';
import { UserEntity } from './users.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  comment: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  user_id: string;

  @ManyToOne(() => JobEntity, (job) => job.comments)
  @JoinColumn({ name: 'job_id' })
  job: JobEntity;

  @Column()
  job_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Timestamp;

  @DeleteDateColumn()
  desativated_at: Date;
}
