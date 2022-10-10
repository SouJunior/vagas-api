import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CompanyEntity } from './company.entity';

enum JobsTypes {
  ESTAGIARIO = 'ESTAGIARIO',
  TRAINNER = 'TRAINNER',
  JUNIOR = 'JUNIOR',
}

@Entity('jobs')
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['ESTAGIARIO', 'TRAINNER', 'JUNIOR'],
    default: JobsTypes.JUNIOR,
  })
  type: string;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @Column()
  company_id: number;

  @OneToMany(() => CommentEntity, (comment) => comment.job, {
    cascade: true,
  })
  comments: CommentEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }
}
