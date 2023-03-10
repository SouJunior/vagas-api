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
  TRAINEE = 'TRAINEE',
  JUNIOR = 'JUNIOR',
  ANALYST = 'ANALYST',
}

enum JobsTypeContractEnum {
  CLT = 'CLT',
  PJ = 'PJ',
  FREELANCE = 'FREELANCE',
}

enum JobsModalityEnum {
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
  IN_PERSON = 'IN_PERSON',
}

enum JobsContractTimeEnum {
  SixMonth = '6m',
  SixMonthToOneYear = '6m - 1a',
  OneYearToTwoYear = '1a - 2a',
  undetermined = 'undetermined',
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
    enum: [JobsTypeEnum.ANALYST, JobsTypeEnum.JUNIOR, JobsTypeEnum.TRAINEE],
    default: JobsTypeEnum.JUNIOR,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: [
      JobsTypeContractEnum.CLT,
      JobsTypeContractEnum.FREELANCE,
      JobsTypeContractEnum.PJ,
    ],
    default: JobsTypeContractEnum.CLT,
  })
  type_contract: string;

  @Column()
  salary: number;

  @Column({
    type: 'enum',
    enum: [
      JobsModalityEnum.HYBRID,
      JobsModalityEnum.IN_PERSON,
      JobsModalityEnum.REMOTE,
    ],
    default: JobsModalityEnum.REMOTE,
  })
  modality: string;

  @Column()
  headquarters: string;

  @Column({
    type: 'enum',
    enum: [
      JobsContractTimeEnum.undetermined,
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
  updated_at: Date;
}
