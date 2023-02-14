import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { CommentsEntity } from './comments.entity';
import { CompaniesEntity } from './companies.entity';

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

@Entity('tb_jobs')
export class JobsEntity {
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

  @ManyToOne(() => CompaniesEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompaniesEntity;

  @Column()
  company_id: string;

  @OneToMany(() => CommentsEntity, (comment) => comment.job, {
    cascade: true,
  })
  comments: CommentsEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Timestamp;
}
