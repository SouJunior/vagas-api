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

enum JobsTypeENum {
  ESTAGIARIO = 'ESTAGIARIO',
  TRAINNER = 'TRAINNER',
  JUNIOR = 'JUNIOR',
  ANALISTA = 'ANALISTA',
}

enum JobsTypeContractENum {
  CLT = 'CLT',
  PJ = 'PJ',
  FREELANCE = 'FREELANCE',
}

enum JobsModalityENum {
  REMOTO = 'REMOTO',
  HIBRIDO = 'HIBRIDO',
  PRESENCIAL = 'PRESENCIAL',
}

enum JobsContractTimeENum {
  'até 6 meses' = 'até 6 meses',
  '6 meses - 1 ano' = '6 meses - 1 ano',
  '1 ano - 2 anos' = '1 ano - 2 anos',
  indeterminado = 'Tempo indeterminado',
}

@Entity('jobs')
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  prerequisites: string;

  @Column()
  benefits: string;

  @Column({
    type: 'enum',
    enum: ['ESTAGIARIO', 'TRAINNER', 'JUNIOR', 'ANALISTA'],
    default: JobsTypeENum.JUNIOR,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: ['CLT', 'PJ', 'FREELANCE'],
    default: JobsTypeContractENum.CLT,
  })
  type_contract: string;

  @Column()
  salary: number;

  @Column({
    type: 'enum',
    enum: ['REMOTO', 'HIBRIDO', 'PRESENCIAL'],
    default: JobsModalityENum.REMOTO,
  })
  modality: string;

  @Column()
  headquarters: string;

  @Column({
    type: 'enum',
    enum: ['até 6 meses', '6 meses - 1 ano', '1 ano - 2 anos', 'indeterminado'],
  })
  contract_time: string;

  @Column({ default: false })
  affirmative: boolean;

  @Column()
  affirmative_type: string;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @Column()
  company_id: string;

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
