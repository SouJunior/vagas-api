import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

type JobsTypes = 'Estagio' | 'Trainner' | 'Junior';

@Entity('jobs')
export class JobEntity {
  @PrimaryColumn()
  id: string;

  @Column('varchar', { nullable: false, length: 255 })
  title: string;

  @Column('varchar', { nullable: false, length: 255 })
  description: string;

  @CreateDateColumn({
    type: 'datetime',
  })
  created_at: Date;

  @Column('enum', {
    default: 'string',
    enum: ['Estagio', 'Trainner', 'Junior'],
  })
  type: JobsTypes;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
