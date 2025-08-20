import { Injectable } from '@nestjs/common';
import {
  Department,
  Menu,
  Permission,
  Role,
  RolePermission,
  User,
  UserPermission,
  UserRole,
} from '@src/infrastructure/entities';
import {
  DepartmentRepository,
  MenuRepository,
  PermissionRepository,
  RolePermissionRepository,
  RoleRepository,
  UserPermissionRepository,
  UserRepository,
  UserRoleRepository,
} from '@src/infrastructure/repositories';
import { DataSource } from 'typeorm';

@Injectable()
export class UnitOfWork {
  public readonly departments: DepartmentRepository;
  public readonly users: UserRepository;
  public readonly roles: RoleRepository;
  public readonly permissions: PermissionRepository;
  public readonly rolePermissions: RolePermissionRepository;
  public readonly userPermissions: UserPermissionRepository;
  public readonly userRoles: UserRoleRepository;
  public readonly menus: MenuRepository;

  constructor(private readonly dataSource: DataSource) {
    this.users = new UserRepository(this.getRepository(User));
    this.departments = new DepartmentRepository(this.getRepository(Department));
    this.roles = new RoleRepository(this.getRepository(Role));
    this.permissions = new PermissionRepository(this.getRepository(Permission));
    this.rolePermissions = new RolePermissionRepository(
      this.getRepository(RolePermission),
    );
    this.userPermissions = new UserPermissionRepository(
      this.getRepository(UserPermission),
    );
    this.userRoles = new UserRoleRepository(this.getRepository(UserRole));
    this.menus = new MenuRepository(this.getRepository(Menu));
    console.log('UnitOfWork initialized with repositories');
  }

  private getRepository<T>(entity: { new (): T }) {
    return this.dataSource.getRepository(entity);
  }
}
