import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { JobEntity } from './jobs.entity';
import { UserEntity } from './users.entity';

@Entity('report')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobEntity)
  @JoinColumn({ name: 'job_id' })
  job: JobEntity;

  @Column()
  job_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  user_id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
