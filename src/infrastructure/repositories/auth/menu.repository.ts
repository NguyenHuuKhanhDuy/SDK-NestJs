import { IMenuRepository } from '@domain/repositories';
import { Menu } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuRepository
  extends GenericRepository<Menu>
  implements IMenuRepository
{
  constructor(
    @InjectRepository(Menu)
    protected readonly repository: Repository<Menu>,
  ) {
    super(repository);
  }
}
