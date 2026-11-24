import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UniqueConstraintError } from 'sequelize';
import { CategoriesRepository } from './categories.repository.js';
import { CategoryDto } from './dto/category.dto.js';

const toConflict = (error: unknown) =>
  error instanceof UniqueConstraintError
    ? new ConflictException('A category with this name already exists')
    : error;

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll() {
    return this.categoriesRepository.findAll();
  }

  async findById(id: number) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(category: CategoryDto) {
    try {
      return await this.categoriesRepository.create(category);
    } catch (error) {
      throw toConflict(error);
    }
  }

  async update(id: number, category: CategoryDto) {
    let updated;
    try {
      updated = await this.categoriesRepository.update(id, category);
    } catch (error) {
      throw toConflict(error);
    }
    if (!updated) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number) {
    if (!(await this.categoriesRepository.remove(id))) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
