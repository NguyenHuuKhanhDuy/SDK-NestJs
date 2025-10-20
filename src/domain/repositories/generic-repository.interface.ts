import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  InsertResult,
  ObjectId,
  ObjectLiteral,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IGenericRepository<Entity extends ObjectLiteral> {
  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;

  findOne(options: FindOneOptions<Entity>): Promise<Entity | null>;

  existsBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<boolean>;

  findBy(where: FindOptionsWhere<Entity>): Promise<Entity[]>;

  findOneBy(where: FindOptionsWhere<Entity>): Promise<Entity | null>;

  findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;

  count(options?: FindManyOptions<Entity>): Promise<number>;

  countBy(where?: FindOptionsWhere<Entity>): Promise<number>;

  createQueryBuilder(alias?: string): SelectQueryBuilder<Entity>;

  insert(
    entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[],
  ): Promise<InsertResult>;

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
  ): Promise<UpdateResult>;

  save<T extends DeepPartial<Entity>>(
    entities: T | T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>;

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
  ): Promise<UpdateResult>;

  deleteHard(
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
  ): Promise<void>;
}
