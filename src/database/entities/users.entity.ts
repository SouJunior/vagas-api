import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { PersonalDataEntity } from './personal-data.entity';

enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('tb_users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  password: string;

  @Column()
  policies: boolean;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'USER'],
    default: RolesEnum.USER,
  })
  type: string;

  @OneToOne(() => PersonalDataEntity)
  @JoinColumn()
  personal_data: PersonalDataEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Timestamp;

  @Column()
  @Generated('uuid')
  recoverPasswordToken?: string;
}
