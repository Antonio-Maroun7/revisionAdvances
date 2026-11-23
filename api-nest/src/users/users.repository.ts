import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn, where } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Role } from '../roles/role.model.js';
import { UserRole } from '../roles/user-role.model.js';
import { UserDto } from './dto/user.dto.js';
import { User } from './user.model.js';

// the user's roles as [{ id, name }], sorted by name
const withRoles = {
  include: [
    { model: Role, attributes: ['id', 'name'], through: { attributes: [] } },
  ],
  order: [
    ['id', 'ASC'],
    [{ model: Role, as: 'roles' }, 'name', 'ASC'],
  ] as never,
};

const toUserRow = (user: UserDto) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  age: user.age,
});

@Injectable() // Marks the class as a provider that can be injected into other classes
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User, // User model for database operations
    @InjectModel(Role) private readonly roleModel: typeof Role, // Role model for database operations
    @InjectModel(UserRole) private readonly userRoleModel: typeof UserRole, // UserRole model for database operations
    private readonly sequelize: Sequelize, // Sequelize instance for raw queries and transactions
  ) {}

  async findAll() {
    const users = await this.userModel.findAll(withRoles);
    return users.map((user) => user.get({ plain: true })); // Convert each user instance to a plain object
  }

  async findById(id: number) {
    const user = await this.userModel.findOne({ where: { id }, ...withRoles });
    return user?.get({ plain: true }); // Convert the user instance to a plain object
  }

  async create(user: UserDto) {
    const created = await this.userModel.create(toUserRow(user));
    return this.findById(created.id);
  }

  // registered accounts also get the default role, in one transaction
  async createWithPassword(user: UserDto, passwordHash: string) {
    const id = await this.sequelize.transaction(async (transaction) => {
      const created = await this.userModel.create(
        { ...toUserRow(user), passwordHash },
        { transaction },
      );
      const defaultRole = await this.roleModel.findOne({
        where: { isDefault: true },
        transaction,
      });
      if (defaultRole) {
        await this.userRoleModel.create(
          { userId: created.id, roleId: defaultRole.id },
          { transaction },
        );
      }
      return created.id;
    });
    return this.findById(id);
  }

  // the only query that returns the hash; never send its result to the client as-is
  async findByEmailWithPassword(email: string) {
    const user = await this.userModel.scope('withPassword').findOne({
      where: where(fn('lower', col('email')), email.toLowerCase()),
    });
    return user?.get({ plain: true });
  }
  async update(id: number, user: UserDto) {
    const [count] = await this.userModel.update(toUserRow(user), {
      where: { id },
    });
    return count ? this.findById(id) : undefined;
  }

  async remove(id: number) {
    return (await this.userModel.destroy({ where: { id } })) > 0;
  }

  // replaces all of the user's roles
  async setRoles(userId: number, roleIds: number[]) {
    await this.sequelize.transaction(async (transaction) => {
      await this.userRoleModel.destroy({ where: { userId }, transaction });
      await this.userRoleModel.bulkCreate(
        roleIds.map((roleId) => ({ userId, roleId })),
        { transaction },
      );
    });
  }
}
