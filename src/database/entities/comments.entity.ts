import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobsEntity } from './jobs.entity';
import { UsersEntity } from './users.entity';

@Entity('tb_comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  comment: string;

  @ManyToOne(() => UsersEntity, { onDelete: "CASCADE"})
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column()
  user_id: string;

  @ManyToOne(() => JobsEntity, (job) => job.comments, { onDelete: "CASCADE"})
  @JoinColumn({ name: 'job_id' })
  job: JobsEntity;

  @Column()
  job_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Date;

  @DeleteDateColumn()
  desativated_at: Date;
}
