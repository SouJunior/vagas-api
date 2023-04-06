import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobsAffirmativeTypeEnum } from '../../modules/jobs/enums/job-affirmative-type.enum';
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

  @Column({ nullable: true })
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
    nullable: true,
  })
  typeContract: string;

  @Column({ nullable: true })
  salaryMin: number;

  @Column({ nullable: true })
  salaryMax: number;

  @Column({ nullable: true })
  federalUnit: string;

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
    default: true,
  })
  indefinideContract: boolean;

  @Column({ nullable: true })
  contractType: string;

  @Column({ default: true })
  affirmative: boolean;

  @Column({
    type: 'enum',
    enum: [
      JobsAffirmativeTypeEnum.BLACK_BROWN_PERSON,
      JobsAffirmativeTypeEnum.CIS_TRANS_WOMEN,
      JobsAffirmativeTypeEnum.LGBTQIA,
      JobsAffirmativeTypeEnum.SIXTY_PLUS,
    ],
    nullable: true,
  })
  affirmativeType: JobsAffirmativeTypeEnum;

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
  createdAt: Date;

  @UpdateDateColumn({ update: true })
  updatedAt: Date;
}
