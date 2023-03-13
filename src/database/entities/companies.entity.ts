import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  linkedin: string;

  @Column()
  description: string;

  @Column()
  address: string;

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
    this.linkedin = company?.linkedin;
    this.description = company?.description;
    this.address = company?.address;
    this.mailConfirm = company?.mailConfirm;
    this.recoverPasswordToken = company?.recoverPasswordToken;
    this.created_at = company?.created_at;
    this.updated_at = company?.updated_at;
  }
}
