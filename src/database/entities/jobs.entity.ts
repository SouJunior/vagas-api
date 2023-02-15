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

enum JobsTypeEnum {
  ESTAGIARIO = 'ESTAGIARIO',
  TRAINNER = 'TRAINNER',
  JUNIOR = 'JUNIOR',
  ANALISTA = 'ANALISTA',
}

enum JobsTypeContractEnum {
  CLT = 'CLT',
  PJ = 'PJ',
  FREELANCE = 'FREELANCE',
}

enum JobsModalityEnum {
  REMOTO = 'REMOTO',
  HIBRIDO = 'HIBRIDO',
  PRESENCIAL = 'PRESENCIAL',
}

enum JobsContractTimeEnum {
  SixMonth = '6m',
  SixMonthToOneYear = '6m - 1a',
  OneYearToTwoYear = '1a - 2a',
  Indeterminate = 'indeterminate',
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
    default: JobsTypeEnum.JUNIOR,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: ['CLT', 'PJ', 'FREELANCE'],
    default: JobsTypeContractEnum.CLT,
  })
  type_contract: string;

  @Column()
  salary: number;

  @Column({
    type: 'enum',
    enum: ['REMOTO', 'HIBRIDO', 'PRESENCIAL'],
    default: JobsModalityEnum.REMOTO,
  })
  modality: string;

  @Column()
  headquarters: string;

  @Column({
    type: 'enum',
    enum: [
      JobsContractTimeEnum.Indeterminate,
      JobsContractTimeEnum.OneYearToTwoYear,
      JobsContractTimeEnum.SixMonth,
      JobsContractTimeEnum.SixMonthToOneYear,
    ],
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
