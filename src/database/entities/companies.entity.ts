import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanySizeEnum } from '../../modules/company/enum/company-size.enum';
import { JobsEntity } from './jobs.entity';

@Entity('tb_companies')
export class CompaniesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cnpj: string;

  @OneToMany(() => JobsEntity, (jobs) => jobs.company)
  jobs: JobsEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  mailConfirm: boolean;

  @Column({ nullable: true })
  recoverPasswordToken: string;

  @Column({ nullable: true })
  companyType: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: [
      CompanySizeEnum.BIG_SIZE,
      CompanySizeEnum.HALF_SIZE,
      CompanySizeEnum.SMALL_SIZE,
    ],
  })
  companySize: string;

  @Column({ nullable: true })
  uf: string;

  @Column({ nullable: true })
  companySite: string;

  @Column({ type: 'json', nullable: true })
  otherSite: {
    instagran: string;
    linkedin: string;
    twitter: string;
  };

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ nullable: true })
  profileKey: string;

  constructor(company?: Partial<CompaniesEntity>) {
    this.id = company?.id;
    this.companyName = company?.companyName;
    this.email = company?.email;
    this.password = company?.password;
    this.cnpj = company?.cnpj;
    this.mailConfirm = company?.mailConfirm;
    this.recoverPasswordToken = company?.recoverPasswordToken;
    this.created_at = company?.created_at;
    this.updated_at = company?.updated_at;
  }
}
