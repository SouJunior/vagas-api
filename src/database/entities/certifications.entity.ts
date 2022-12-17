import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('certifications')
export class CertificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  institution: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  constructor(certification?: Partial<CertificationEntity>) {
    this.id = certification?.id;
    this.name = certification?.name;
    this.institution = certification?.institution;
    this.description = certification?.description;
    this.created_at = certification?.created_at;
    this.updated_at = certification?.updated_at;
  }
}
