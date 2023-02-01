import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { CertificationEntity } from './certifications.entity';
import { CourseEntity } from './courses.entity';
import { LanguageEntity } from './languages.entity';
import { WorkExperienceEntity } from './work-experiences.entity';

enum GenderEnum {
  CIS_MALE = 'CIS_MALE',
  CIS_FEMALE = 'CIS_FEMALE',
  TRANS_MALE = 'TRANS_MALE',
  TRANS_FEMALE = 'TRANS_FEMALE',
  NOT_BINARY = 'NOT_BINARY',
  NO_ANSWER = 'NO_ANSWER',
}

@Entity('personal_data')
export class PersonalDataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  birth: Date;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.NO_ANSWER,
  })
  gender: string;

  @Column()
  pcd: boolean;

  @Column()
  st_adress: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @OneToMany(() => CourseEntity, (course) => course.personal_data)
  courses: CourseEntity[];

  @OneToMany(
    () => WorkExperienceEntity,
    (workExperience) => workExperience.personal_data,
  )
  workExperiences: WorkExperienceEntity[];

  @OneToMany(() => LanguageEntity, (language) => language.personal_data)
  languages: LanguageEntity[];

  @OneToMany(
    () => CertificationEntity,
    (certification) => certification.personal_data,
  )
  certifications: CertificationEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Timestamp;

  constructor(personalData?: Partial<PersonalDataEntity>) {
    this.id = personalData?.id;
    this.birth = personalData?.birth;
    this.gender = personalData?.gender;
    this.pcd = personalData?.pcd;
    this.st_adress = personalData?.st_adress;
    this.city = personalData?.city;
    this.region = personalData?.region;
    this.courses = personalData?.courses;
    this.workExperiences = personalData?.workExperiences;
    this.languages = personalData?.languages;
    this.certifications = personalData?.certifications;
    this.created_at = personalData?.created_at;
    this.updated_at = personalData?.updated_at;
  }
}
