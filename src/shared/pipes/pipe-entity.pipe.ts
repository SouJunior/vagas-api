import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { validate as isValidUUID } from 'uuid';

import { CommentEntity } from 'src/database/entities/comment.entity';
import { CompanyEntity } from 'src/database/entities/company.entity';
import { JobEntity } from 'src/database/entities/jobs.entity';
import { ReportEntity } from 'src/database/entities/report.entity';
import { UserEntity } from 'src/database/entities/users.entity';
import { EntityTarget, getRepository } from 'typeorm';

type Entities =
  | CommentEntity
  | CompanyEntity
  | JobEntity
  | ReportEntity
  | UserEntity;

export type EntityRelations<Entity> = {
  [Key in keyof Entity]: Entity[Key] extends Entities
    ? Key
    : Entity[Key] extends Entities[]
    ? Key
    : Key;
}[keyof Entity];

@Injectable()
export default class GetEntity<Model> implements PipeTransform {
  private readonly relations: any;

  constructor(
    private readonly entity: EntityTarget<Model>,
    relations?: EntityRelations<Model> | EntityRelations<Model>[],
    private readonly field = 'id',
  ) {
    this.relations = typeof relations === 'string' ? [relations] : relations;
  }

  async transform(value: any) {
    if (!value || value === '' || value === 'undefined') {
      throw new BadRequestException('No entity id provided');
    }

    if (!isValidUUID(value)) {
      throw new BadRequestException('Invalid id');
    }

    const entity = await getRepository(this.entity).findOne({
      where: { [this.field]: value },
      relations: this.relations,
    });

    if (!entity) {
      const entity = `${this.entity.toString()}`
        .match(/\w+/g)[1]
        .replace('Entity', '');

      throw new NotFoundException(`Validation failed for ${entity} value`);
    }

    return entity;
  }
}
