import { JobsEntity } from "src/database/entities/jobs.entity";

export interface IResponse {
    message?: string,
    data?: JobsEntity
  }