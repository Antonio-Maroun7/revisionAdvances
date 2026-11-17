import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseError } from 'pg';
import { UserDto } from './dto/user.dto.js';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(user: UserDto) {
    return this.usersRepository.create(user);
  }

  async update(id: number, user: UserDto) {
    const updated = await this.usersRepository.update(id, user);

    if (!updated) {
      throw new NotFoundException('User not found');
    }

    return updated;
  }

  async remove(id: number) {
    let deleted;

    try {
      deleted = await this.usersRepository.remove(id);
    } catch (error) {
      if (error instanceof DatabaseError && error.code === '23503') {
        throw new ConflictException(
          'User is referenced by other records and cannot be deleted',
        );
      }
      throw error;
    }

    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }
}
