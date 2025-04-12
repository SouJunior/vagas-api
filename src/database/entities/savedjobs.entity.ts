import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { UsersEntity } from './users.entity';
  
  @Entity('tb_saved_jobs')
  export class SavedJobsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => UsersEntity, (user) => user.savedJobs)
    user: UsersEntity;
  
    @Column('uuid') 
    jobId: string;
  
    @CreateDateColumn()
    savedAt: Date;
  
    constructor(savedJob?: Partial<SavedJobsEntity>) {
      this.id = savedJob?.id;
      this.user = savedJob?.user;
      this.jobId = savedJob?.jobId;
      this.savedAt = savedJob?.savedAt;
    }
  }