import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '@src/common/models/base.controller';

@Controller({ path: 'bo/user', version: '1' })
@ApiTags('User Management')
export class BoUserController extends BaseController {}
