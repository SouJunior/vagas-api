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
import { UsersEntity } from './users.entity';

@Entity('companies')
export class CompaniesEntity {
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

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column()
  user_id: string;

  @Column()
  owner_name: string;

  @Column()
  owner_phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Timestamp;
}
