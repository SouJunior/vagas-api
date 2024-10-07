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
import { JobsTypeContractEnum } from '../../modules/jobs/enums/job-contract-type.enum';
import { JobsModalityEnum } from '../../modules/jobs/enums/job-modality.enum';
import { JobsTypeEnum } from '../../modules/jobs/enums/job-type.enum';
import { ApplicationEntity } from './applications.entity';
import { CommentsEntity } from './comments.entity';
import { CompaniesEntity } from './companies.entity';
import { CandidacyEntity } from './candidacy.entity';

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
    enum: [
      JobsTypeEnum.ANALYST,
      JobsTypeEnum.JUNIOR,
      JobsTypeEnum.TRAINEE,
      JobsTypeEnum.INTERNSHIP,
    ],
    default: JobsTypeEnum.JUNIOR,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: [
      JobsTypeContractEnum.CLT,
      JobsTypeContractEnum.PJ,
      JobsTypeContractEnum.OTHER,
    ],
    default: JobsTypeContractEnum.CLT,
    nullable: true,
  })
  typeContract: string;

  @Column({ nullable: true })
  salaryMin: number;

  @Column({ nullable: true })
  salaryMax: number;

  @Column({
    type: 'enum',
    enum: [
      JobsModalityEnum.HYBRID,
      JobsModalityEnum.ON_SITE,
      JobsModalityEnum.REMOTE,
    ],
    default: JobsModalityEnum.REMOTE,
  })
  modality: string;

  @Column({ nullable: true })
  federalUnit: string;

  @Column({ nullable: true })
  city: string;

  @Column({
    default: true,
  })
  openEndedContract: boolean;

  @Column({ nullable: true })
  contractType: string;

  @Column({ nullable: true })
  contractText?: string;

  @Column({ default: true })
  affirmative: boolean;

  @Column({
    type: 'enum',
    enum: [
      JobsAffirmativeTypeEnum.BLACK_BROWN_PERSON,
      JobsAffirmativeTypeEnum.CIS_TRANS_WOMEN,
      JobsAffirmativeTypeEnum.LGBTQIA,
      JobsAffirmativeTypeEnum.SIXTY_PLUS,
      JobsAffirmativeTypeEnum.PWD,
    ],
    nullable: true,
  })
  affirmativeType: string;

  @ManyToOne(() => CompaniesEntity, { onDelete: "CASCADE"})
  @JoinColumn({ name: 'company_id' })
  company: CompaniesEntity;

  @Column()
  company_id: string;

  @Column({ nullable: false, default: 'ACTIVE' })
  status: string;

  @OneToMany(() => CommentsEntity, (comment) => comment.job, {
    cascade: true,
  })
  comments: CommentsEntity[];

  @OneToMany(() => ApplicationEntity, (application) => application.job, {
    cascade: true,
  })
  applications: ApplicationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ update: true })
  updatedAt: Date;

  @Column({ nullable: true })
  content: string;

  @OneToMany(() => CandidacyEntity, (candidacy) => candidacy.job)
    candidacies: CandidacyEntity[];
}
