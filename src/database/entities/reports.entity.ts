import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { JobEntity } from './jobs.entity';
import { UserEntity } from './users.entity';

@Entity('report')
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => JobEntity)
  @JoinColumn({ name: 'job_id' })
  job: JobEntity;

  @Column()
  job_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  user_id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
