import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { UsersEntity } from './users.entity'; 
  import { JobsEntity } from './jobs.entity'; 
  
  @Entity('tb_candidacies') 
  export class CandidacyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('uuid')
    vagaId: string;
  
    @Column('uuid')
    usuarioId: string; 
  
    @Column({ type: 'enum', enum: ['em andamento', 'encerrada', 'sem interesse'] })
    status: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dataCandidatura: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    dataEncerramento: Date;
  
    @ManyToOne(() => UsersEntity)
    @JoinColumn({ name: 'usuarioId' })
    user: UsersEntity; 
  
    @ManyToOne(() => JobsEntity)
    @JoinColumn({ name: 'vagaId' })
    job: JobsEntity;
  }
  