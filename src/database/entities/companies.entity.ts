import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
