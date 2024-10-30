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
    type: 'timestamp',
    name: 'date_candidacy',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCandidacy: Date;

  @Column({ type: 'timestamp', nullable: true })
  dateclosing: Date;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => JobsEntity)
  @JoinColumn({ name: 'job_id' })
  job: JobsEntity;
}
