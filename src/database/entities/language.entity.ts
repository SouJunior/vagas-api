import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum ProficenceEnum {
  BASIC = 'BASIC',
  INTERMEDITE = 'INTERMEDITE',
  ADVANCED = 'ADVANCED',
  FLUENT = 'FLUENT',
}

@Entity('users')
export class LanguageEntity {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  constructor(language?: Partial<LanguageEntity>) {
    this.id = language?.id;
    this.language = language?.language;
    this.writing = language?.writing;
    this.reading = language?.reading;
    this.listening = language?.listening;
    this.speaking = language?.speaking;
    this.created_at = language?.created_at;
    this.updated_at = language?.updated_at;
  }
}
