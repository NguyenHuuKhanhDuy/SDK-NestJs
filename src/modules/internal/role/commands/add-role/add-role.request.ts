import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddRoleRequest {
  @ApiProperty({ example: 'ADMIN' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Admin role' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: ['user.create', 'user.update'] })
  @IsOptional()
  @IsUUID('all', { each: true })
  permissionIds: string[];
}
