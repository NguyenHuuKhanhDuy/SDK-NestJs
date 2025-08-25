import { permissionHandlers } from './permissions';
import { roleHandlers } from './roles';

export const queryHandlers = [...permissionHandlers, ...roleHandlers];
