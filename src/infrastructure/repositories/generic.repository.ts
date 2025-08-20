import { IGenericRepository } from '@domain/repositories/generic-repository.interface';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  InsertResult,
  ObjectId,
  ObjectLiteral,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class GenericRepository<Entity extends ObjectLiteral>
  implements IGenericRepository<Entity>
{
  constructor(protected readonly repository: Repository<Entity>) {}

  find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  findOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
    return this.repository.findOne(options);
  }

  findBy(where: FindOptionsWhere<Entity>): Promise<Entity[]> {
    return this.repository.findBy(where);
  }

  findOneBy(where: FindOptionsWhere<Entity>): Promise<Entity | null> {
    return this.repository.findOneBy(where);
  }

  findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]> {
    return this.repository.findAndCount(options);
  }

  count(options?: FindManyOptions<Entity>): Promise<number> {
    return this.repository.count(options);
  }

  countBy(where: FindOptionsWhere<Entity>): Promise<number> {
    return this.repository.countBy(where);
  }

  createQueryBuilder(alias?: string): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(alias);
  }

  insert(
    entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[],
  ): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity);
  }

  save<T extends DeepPartial<Entity>>(
    entities: T | T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]> {
    const entitiesArray = Array.isArray(entities) ? entities : [entities];
    return this.repository.save(entitiesArray, options);
  }

  softDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>
      | FindOptionsWhere<Entity>[],
    deletedBy: string,
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, {
      deletedBy,
      deletedAt: new Date(),
    } as unknown as QueryDeepPartialEntity<Entity>);
  }

  async deleteHard(
    criteria:
      | string
      | number
      | Date
      | string[]
      | ObjectId
      | FindOptionsWhere<Entity>
      | number[]
      | Date[]
      | ObjectId[]
      | FindOptionsWhere<Entity>[],
  ): Promise<void> {
    await this.repository.delete(criteria);
  }
}
