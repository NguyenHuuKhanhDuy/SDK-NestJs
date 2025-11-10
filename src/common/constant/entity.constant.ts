export const Schemas = {
  Ecommerce: 'ecommerce',
  Communication: 'communication',
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
  Notification: 'notification',
  NotificationSetting: 'notification_setting',
  NotificationTemplate: 'notification_template',
  Country: 'country',
  SystemConfig: 'system_config',
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
    CountryId: 'country_id',
    RoleId: 'role_id',
    TwoFactorSecret: 'two_factor_secret',
    TwoFactorEnabled: 'two_factor_enabled',
    RecoveryCode: 'recovery_code',
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
    Type: 'type',
  },
  Role: {
    Name: 'name',
    Description: 'description',
    Type: 'type',
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
    ParentId: 'parent_id',
    OrderNo: 'order_no',
    IsActive: 'is_active',
    Link: 'link',
  },
  Notification: {
    UserId: 'recipient_id',
    TemplateId: 'template_id',
    Message: 'message',
    Link: 'link',
    SendingTime: 'sending_time',
    SuccessSendingTime: 'succeed_sending_time',
    IsRead: 'is_read',
    ReadAt: 'read_at',
    ActionType: 'action_type',
    ActionData: 'action_data',
  },
  NotificationSetting: {
    Name: 'name',
    Description: 'description',
    Type: 'type',
    IsUrgent: 'is_urgent',
  },
  NotificationTemplate: {
    Type: 'type',
    Code: 'code',
    Description: 'description',
    SettingId: 'notification_setting_id',
    EmailSender: 'email_sender',
    Subject: 'subject',
    ListOfRecipientTypes: 'list_of_recipient_types',
    Content: 'content',
    IsLatestVersion: 'is_latest_version',
  },
  Country: {
    Name: 'name',
    Code: 'code',
    DialCode: 'dial_code',
    FlagUrl: 'flag_url',
    Alpha2Code: 'alpha2_code',
    Alpha3Code: 'alpha3_code',
  },
  SystemConfig: {
    Key: 'key',
    Description: 'description',
    Value: 'value',
    IsActive: 'is_active',
  },
};

export const Keys = {
  User: {
    Primary: 'pk_user',
    ForeignKey: {
      Department: 'fk_user__department',
      Country: 'fk_user__country',
      Role: 'fk_user__role',
    },
    Unique: {
      Username: 'uq_user__username',
      Email: 'uq_user__email',
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
    ForeignKey: {
      Parent: 'fk_menu__parent',
    },
  },
  Notification: {
    Primary: 'pk_notification',
    ForeignKey: {
      NotificationTemplate: 'fk_notification__notification_template',
      User: 'fk_notification__user',
    },
  },
  NotificationSetting: {
    Primary: 'pk_notification_setting',
  },
  NotificationTemplate: {
    Primary: 'pk_notification_template',
    ForeignKey: {
      NotificationSetting: 'fk_notification_template__notification_setting',
    },
  },
  Country: {
    Primary: 'pk_country',
  },
  SystemConfig: {
    Primary: 'pk_system_config',
  },
};
