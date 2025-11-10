import { Injectable } from '@nestjs/common';
import {
  AuditLog,
  Country,
  Department,
  Menu,
  Notification,
  NotificationSetting,
  NotificationTemplate,
  Permission,
  Role,
  RolePermission,
  SystemConfig,
  User,
  UserPermission,
} from '@src/infrastructure/entities';
import {
  AuditLogRepository,
  CountryRepository,
  DepartmentRepository,
  MenuRepository,
  NotificationRepository,
  NotificationSettingRepository,
  NotificationTemplateRepository,
  PermissionRepository,
  RolePermissionRepository,
  RoleRepository,
  SystemConfigRepository,
  UserPermissionRepository,
  UserRepository,
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
  public readonly menus: MenuRepository;
  public readonly notifications: NotificationRepository;
  public readonly notificationSettings: NotificationSettingRepository;
  public readonly notificationTemplates: NotificationTemplateRepository;
  public readonly countries: CountryRepository;
  public readonly systemConfigs: SystemConfigRepository;
  public readonly auditLogs: AuditLogRepository;

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
    this.menus = new MenuRepository(em.getRepository(Menu));
    this.notifications = new NotificationRepository(
      em.getRepository(Notification),
    );
    this.notificationSettings = new NotificationSettingRepository(
      em.getRepository(NotificationSetting),
    );
    this.notificationTemplates = new NotificationTemplateRepository(
      em.getRepository(NotificationTemplate),
    );
    this.countries = new CountryRepository(em.getRepository(Country));
    this.systemConfigs = new SystemConfigRepository(
      em.getRepository(SystemConfig),
    );
    this.auditLogs = new AuditLogRepository(em.getRepository(AuditLog));
  }

  async withTransaction<T>(
    work: (txUow: UnitOfWork) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(async (em) => {
      const txUow = new UnitOfWork(this.dataSource, em);
      return work(txUow);
    });
  }

  async executeSql<T = any>(query: string, parameters?: any[]): Promise<T[]> {
    const em = this.manager ?? this.dataSource.manager;
    return await em.query(query, parameters);
  }
}
