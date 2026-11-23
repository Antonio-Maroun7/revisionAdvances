import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: `categories`, timestamps: true })
export class Category extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: `is_active`,
  })
  isActive: boolean;

  @Column({ type: DataType.DATE, field: `created_at` })
  declare createdAt: Date;
}
