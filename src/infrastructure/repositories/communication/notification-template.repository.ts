import { NotificationTemplate } from '@infrastructure/entities';
import { GenericRepository } from '@infrastructure/repositories/generic.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationTemplateRepository extends GenericRepository<NotificationTemplate> {
  constructor(
    @InjectRepository(NotificationTemplate)
    protected readonly repository: Repository<NotificationTemplate>,
  ) {
    super(repository);
  }
}
