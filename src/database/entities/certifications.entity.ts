import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { PersonalDataEntity } from './personal-data.entity';

@Entity('tb_certifications')
export class CertificationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  institution: string;

  @Column()
  description: string;

  @ManyToOne(() => PersonalDataEntity)
  @JoinColumn({ name: 'personal_data_id' })
  personal_data: PersonalDataEntity;

  @Column()
  personal_data_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Date;

  constructor(certification?: Partial<CertificationsEntity>) {
    this.id = certification?.id;
    this.name = certification?.name;
    this.institution = certification?.institution;
    this.description = certification?.description;
    this.personal_data_id = certification?.personal_data_id;
    this.created_at = certification?.created_at;
    this.updated_at = certification?.updated_at;
  }
}
