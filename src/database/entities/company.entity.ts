import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column()
  email: string;

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

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }
}
