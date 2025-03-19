import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity("tb_saved_jobs")
export class SavedJobEntity {

    @PrimaryGeneratedColumn('uuid')
      id: string;

    @ManyToMany(() => UsersEntity, (user) => user.savedJobs)
      user: UsersEntity[];

}
