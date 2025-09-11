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
import { DataSource, EntityManager } from 'typeorm';

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

  constructor(
    private readonly dataSource: DataSource,
    private readonly manager?: EntityManager,
  ) {
    const em = this.manager ?? this.dataSource.manager;

    this.users = new UserRepository(em.getRepository(User));
    this.departments = new DepartmentRepository(em.getRepository(Department));
    this.roles = new RoleRepository(em.getRepository(Role));
    this.permissions = new PermissionRepository(em.getRepository(Permission));
    this.rolePermissions = new RolePermissionRepository(
      em.getRepository(RolePermission),
    );
    this.userPermissions = new UserPermissionRepository(
      em.getRepository(UserPermission),
    );
    this.userRoles = new UserRoleRepository(em.getRepository(UserRole));
    this.menus = new MenuRepository(em.getRepository(Menu));
  }

  async withTransaction<T>(
    work: (txUow: UnitOfWork) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(async (em) => {
      const txUow = new UnitOfWork(this.dataSource, em);
      return work(txUow);
    });
  }
}
