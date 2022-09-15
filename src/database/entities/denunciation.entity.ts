import { Column } from 'typeorm';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { JobEntity } from './jobs.entity';
import { UserEntity } from './users.entity';

@Entity('denunciations')
export class DenunciationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => JobEntity, (job) => job.id)
  job_id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  user_id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
