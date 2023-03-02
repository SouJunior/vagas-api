import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_companies')
export class CompaniesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cnpj: string;

  @Column()
  linkedin: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Timestamp;

  @Column({ default: false })
  mailconfirm: Boolean;

  @Column({ nullable: true })
  recoverPasswordToken?: string;

  constructor(company?: Partial<CompaniesEntity>) {
    this.id = company?.id;
    this.company_name = company?.company_name;
    this.email = company?.email;
    this.password = company?.password;
    this.cnpj = company?.cnpj;
    this.linkedin = company?.linkedin;
    this.description = company?.description;
    this.address = company?.address;
    this.mailconfirm = company?.mailconfirm;
    this.recoverPasswordToken = company?.recoverPasswordToken;
    this.created_at = company?.created_at;
    this.updated_at = company?.updated_at;
  }
}
