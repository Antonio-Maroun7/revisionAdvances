import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model.js';
import { CategoryDto } from './dto/category.dto.js';

const toCategoryRow = (category: CategoryDto) => ({
  name: category.name,
  description: category.description ?? null,
  isActive: category.isActive ?? true,
});

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async findAll() {
    const categories = await this.categoryModel.findAll({
      order: [['id', 'ASC']],
    });
    return categories.map((category) => category.toJSON());
  }

  async findById(id: number) {
    const category = await this.categoryModel.findByPk(id);
    return category?.toJSON(); // Return the category as a JSON object if it exists, otherwise return undefined
  }

  async create(category: CategoryDto) {
    return (await this.categoryModel.create(toCategoryRow(category))).toJSON();
  }

  async update(id: number, category: CategoryDto) {
    const [count, rows] = await this.categoryModel.update(
      toCategoryRow(category),
      {
        where: { id },
        returning: true,
      },
    );
    return count > 0 ? rows[0].toJSON() : null;
  }

  async remove(id: number) {
    return (
      (await this.categoryModel.destroy({
        where: { id },
      })) > 0
    );
  }
}
