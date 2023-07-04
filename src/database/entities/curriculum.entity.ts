import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { ApplicationEntity } from './applications.entity';

@Entity('tb_curriculum')
export class CurriculumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @OneToMany(() => ApplicationEntity, (application) => application.curriculum)
  applications: ApplicationEntity[];

  @Column()
  file: string;

  @Column()
  fileKey: string;

  @CreateDateColumn()
  created_at: Date;
}
