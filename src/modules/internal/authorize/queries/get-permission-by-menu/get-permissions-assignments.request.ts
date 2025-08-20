import { IsUUID } from 'class-validator';

export class GetPermissionsAssignmentsRequest {
  @IsUUID()
  userId: string;
}
