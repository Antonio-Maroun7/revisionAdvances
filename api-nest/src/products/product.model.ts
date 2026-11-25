import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../categories/category.model.js';
import { toFloat } from '../common/decimal.js';

@Table({ tableName: `Products`, timestamps: false })
export class Product extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string | null;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    get(this: Product) {
      return toFloat(this.getDataValue('price'));
    },
  })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  quantity: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, field: `category_id` })
  categoryId: number | null;

  @Column({ type: DataType.DATE, field: `created_at` })
  declare createdAt: Date;
}
