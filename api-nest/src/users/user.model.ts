import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';

@DefaultScope(() => ({ attributes: { exclude: ['passwordHash'] } }))
@Scopes(() => ({ withPassword: { attributes: { include: ['passwordHash'] } } }))
@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.TEXT, allowNull: false, field: 'first_name' })
  firstName: string;

  @Column({ type: DataType.TEXT, allowNull: false, field: 'last_name' })
  lastName: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  email: string;

  @Column({ type: DataType.INTEGER })
  age: number | null;

  @Column({ type: DataType.TEXT, field: 'password_hash' })
  passwordHash: string | null;

  @Column({ type: DataType.DATE, field: `created_at` })
  declare createdAt: Date;

  roles: Role[];
}
