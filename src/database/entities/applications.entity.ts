import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurriculumEntity } from './curriculum.entity';
import { JobsEntity } from './jobs.entity';
import { UsersEntity } from './users.entity';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApplicationStatus } from './enums/application-status.enum';

@Entity('tb_applications')
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ManyToOne(() => JobsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  @Index()
  job: JobsEntity;

  @Column()
  @IsUUID()
  @IsNotEmpty()
  job_id: string;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: UsersEntity;

  @Column()
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ManyToOne(() => CurriculumEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curriculum_id' })
  @Index()
  curriculum: CurriculumEntity;

  @Column()
  @IsUUID()
  @IsNotEmpty()
  curriculum_id: string;

  @CreateDateColumn()
  created_date_time: Date;

  @UpdateDateColumn({ update: true })
  updated_date_time: Date;

  @Column({ type: 'enum', enum: ApplicationStatus })
  status: ApplicationStatus;
}

export { ApplicationStatus };
