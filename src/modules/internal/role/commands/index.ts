import { AddRoleHandler } from './add-role/add-role.handler';
import { DeleteRoleHandler } from './delete-role/delete-role.handler';
import { UpdateRoleHandler } from './update-role/update-role.handler';

export const commandHandlers = [
  AddRoleHandler,
  DeleteRoleHandler,
  DeleteRoleHandler,
  UpdateRoleHandler,
];
export * from './add-role/add-role.command';
export * from './add-role/add-role.request';
export * from './delete-role/delete-role.command';
export * from './update-role/update-role.command';
export * from './update-role/update-role.request';
