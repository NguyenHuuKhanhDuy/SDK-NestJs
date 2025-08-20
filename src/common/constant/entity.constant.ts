export const Schemas = {
  Ecommerce: 'ecommerce',
};

export const Tables = {
  User: 'user',
  Department: 'department',
  Permission: 'permission',
  Role: 'role',
  RolePermission: 'role_permission',
  UserPermission: 'user_permission',
  UserRole: 'user_role',
  Menu: 'menu',
};

export const Columns = {
  Base: {
    ID: 'id',
    CreatedAt: 'created_at',
    UpdatedAt: 'updated_at',
    CreatedBy: 'created_by',
    UpdatedBy: 'updated_by',
    IsDeleted: 'isDeleted',
    DeletedBy: 'deleted_by',
    DeletedAt: 'deleted_at',
  },
  User: {
    DepartmentId: 'department_id',
    Email: 'email',
    FirstName: 'first_name',
    LastName: 'last_name',
    Username: 'user_name',
    Password: 'password',
    Status: 'status',
    IsSystemUser: 'is_system_user',
    IsConfirmed: 'is_confirmed',
    Provider: 'provider',
  },
  Department: {
    Name: 'name',
    Description: 'description',
  },
  Permission: {
    Name: 'name',
    Description: 'description',
    Key: 'key',
    MenuId: 'menu_id',
  },
  Role: {
    Name: 'name',
    Description: 'description',
  },
  RolePermission: {
    RoleId: 'role_id',
    PermissionId: 'permission_id',
  },
  UserPermission: {
    UserId: 'user_id',
    PermissionId: 'permission_id',
  },
  UserRole: {
    UserId: 'user_id',
    RoleId: 'role_id',
  },
  Menu: {
    Name: 'name',
    Key: 'key',
    Description: 'description',
  },
};

export const Keys = {
  User: {
    Primary: 'pk_user',
    ForeignKey: {
      Department: 'fk_user__department',
    },
  },
  Department: {
    Primary: 'pk_department',
  },
  Permission: {
    Primary: 'pk_permission',
    ForeignKey: {
      Menu: 'fk_permission__menu',
    },
  },
  Role: {
    Primary: 'pk_role',
  },
  RolePermission: {
    ForeignKey: {
      Role: 'fk_role_permission__role',
      Permission: 'fk_role_permission__permission',
    },
  },
  UserPermission: {
    ForeignKey: {
      User: 'fk_user_permission__user',
      Permission: 'fk_user_permission__permission',
    },
  },
  UserRole: {
    ForeignKey: {
      User: 'fk_user_role__user',
      Role: 'fk_user_role__role',
    },
  },
  Menu: {
    Primary: 'pk_menu',
  },
};
