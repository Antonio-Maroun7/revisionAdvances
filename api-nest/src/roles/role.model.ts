import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from '../permissions/permission.model.js';
import { RolePermission } from './role-permission.model.js';

@Table({ tableName: `roles`, timestamps: false })
export class Role extends Model {
  declare id: number;

  name: string;

  description: string | null;

  isSystem: boolean;

  isDefault: boolean;

  declare ceatedAt: Date;

  permissions: Permission[];
}
