import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { CurriculumEntity } from './curriculum.entity';
import { JobsEntity } from './jobs.entity';
import { UsersEntity } from './users.entity';

@Entity('tb_applications')
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => JobsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: JobsEntity;

  @Column()
  job_id: string;

  @Index('idx_applications_user_id')
  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @RelationId((app: ApplicationEntity) => app.user)
  user_id: string;
  @ManyToOne(() => CurriculumEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curriculum_id' })
  curriculum: CurriculumEntity;

  @Column()
  curriculum_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Date;
}
