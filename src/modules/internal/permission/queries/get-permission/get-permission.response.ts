export class GetPermissionResponse {
  data: PermissionModuleDto[] = [];
}

export class ActionDto {
  id: string;
  key: string;
  label: string;

  constructor(partial?: Partial<ActionDto>) {
    Object.assign(this, partial);
  }
}

export class SectionDto {
  key: string;
  label: string;
  actions: ActionDto[];

  constructor(partial?: Partial<SectionDto>) {
    Object.assign(this, partial);
  }
}

export class PermissionModuleDto {
  id: string;
  key: string;
  label: string;
  description?: string;
  actions: ActionDto[];
  sections: SectionDto[];

  constructor(partial?: Partial<PermissionModuleDto>) {
    Object.assign(this, partial);
  }
}
