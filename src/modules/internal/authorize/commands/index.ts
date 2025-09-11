import { AddRoleHandler } from './add-role/add-role.handler';
import { UpdateRoleHandler } from './update-role/update-role.handler';

export const commandsHandler = [AddRoleHandler, UpdateRoleHandler];
export * from './add-role/add-role.command';
export * from './add-role/add-role.request';
export * from './update-role/update-role.command';
export * from './update-role/update-role.request';
