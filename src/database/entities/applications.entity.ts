import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CurriculumEntity } from './curriculum.entity';
import { JobsEntity } from './jobs.entity';
import { UsersEntity } from './users.entity';

@Entity('tb_applications')
export class ApplicationEntity {
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

  @ManyToOne(() => CurriculumEntity)
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;

  @Column()
  curriculum_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Date;
}
