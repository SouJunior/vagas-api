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

enum ProficenceEnum {
  BASIC = 'BASIC',
  INTERMEDITE = 'INTERMEDITE',
  ADVANCED = 'ADVANCED',
  FLUENT = 'FLUENT',
}

@Entity('languages')
export class LanguagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  language: string;

  @Column({
    type: 'enum',
    enum: ProficenceEnum,
    default: ProficenceEnum.BASIC,
  })
  writing: string;

  @Column({
    type: 'enum',
    enum: ProficenceEnum,
    default: ProficenceEnum.BASIC,
  })
  reading: string;

  @Column({
    type: 'enum',
    enum: ProficenceEnum,
    default: ProficenceEnum.BASIC,
  })
  listening: string;

  @Column({
    type: 'enum',
    enum: ProficenceEnum,
    default: ProficenceEnum.BASIC,
  })
  speaking: string;

  @ManyToOne(() => PersonalDataEntity)
  @JoinColumn({ name: 'personal_data_id' })
  personal_data: PersonalDataEntity;

  @Column()
  personal_data_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Timestamp;

  constructor(language?: Partial<LanguagesEntity>) {
    this.id = language?.id;
    this.language = language?.language;
    this.writing = language?.writing;
    this.reading = language?.reading;
    this.listening = language?.listening;
    this.speaking = language?.speaking;
    this.personal_data_id = language?.personal_data_id;
    this.created_at = language?.created_at;
    this.updated_at = language?.updated_at;
  }
}
