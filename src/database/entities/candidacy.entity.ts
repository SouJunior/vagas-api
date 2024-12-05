import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { JobsEntity } from './jobs.entity';
import { CandidacyStatus } from './candidancy-status.enum';

@Entity('tb_candidacies')
export class CandidacyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'job_id' })
  jobId: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column({ type: 'enum', enum: CandidacyStatus })
  status: CandidacyStatus;

  @Column({
    type: 'date',
    name: 'date_candidacy',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCandidacy: Date;

  @Column({ name: 'date_closing', type: 'timestamp', nullable: true })
  dateClosing: Date;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => JobsEntity)
  @JoinColumn({ name: 'job_id' })
  job: JobsEntity;
}
