import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum CourseTypeEnum {
  GRADUATION = 'GRADUATION',
  TECHNICAL = 'TECHNICAL',
  CAPACITY = 'CAPACITY',
  FREE = 'FREE',
}

enum CourseStatusEnum {
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  LOCKED = 'LOCKED',
}

enum CourseDurationEnum {
  FAST = 'FAST',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}
@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CourseTypeEnum,
    default: CourseTypeEnum.FREE,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: CourseDurationEnum,
    default: CourseDurationEnum.FAST,
  })
  duration: string;

  @Column()
  institution: string;

  @Column()
  start_date: Date;

  @Column({
    type: 'enum',
    enum: CourseStatusEnum,
    default: CourseStatusEnum.COMPLETED,
  })
  status: string;

  @Column()
  end_date: Date;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  constructor(course?: Partial<CourseEntity>) {
    this.id = course?.id;
    this.name = course?.name;
    this.type = course?.type;
    this.duration = course?.duration;
    this.institution = course?.institution;
    this.start_date = course?.start_date;
    this.status = course?.status;
    this.end_date = course?.end_date;
    this.description = course?.description;
    this.created_at = course?.created_at;
    this.updated_at = course?.updated_at;
  }
}
