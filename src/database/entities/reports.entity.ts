import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { JobsEntity } from './jobs.entity';
import { UsersEntity } from './users.entity';

@Entity('report')
export class ReportsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => JobsEntity)
  @JoinColumn({ name: 'job_id' })
  job: JobsEntity;

  @Column()
  job_id: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column()
  user_id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Timestamp;
}
