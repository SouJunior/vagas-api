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
  
  @Entity('tb_candidacies', { indexes: [{ columns: ['userId'] }, { columns: ['jobId'] }] })
  export class CandidacyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('uuid')
  jobId: string;
  
  @Column('uuid')
  userId: string;
  
  @Column({ type: 'enum', enum: CandidacyStatus })
  status: CandidacyStatus;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCandidacy: Date;
  
  @Column({
  type: 'timestamp',
  nullable: true,
  onUpdate: () => 'CURRENT_TIMESTAMP'
  })
  dateClosing: Date;
  
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;
  
  @ManyToOne(() => JobsEntity)
  @JoinColumn({ name: 'jobId' })
  job: JobsEntity;
  }