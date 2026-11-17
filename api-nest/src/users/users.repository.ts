import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { UserDto } from './dto/user.dto.js';

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  age?: number | null;
}

const userColumns = `
  id,
  first_name AS "firstName",
  last_name AS "lastName",
  email,
  age,
  created_at AS "createdAt"
`;

const userRoles = `
  (SELECT COALESCE(
    json_agg(
      json_build_object('id', roles.id, 'name', roles.name)
      ORDER BY roles.name
    ), '[]')
   FROM user_roles
   JOIN roles ON roles.id = user_roles.role_id
   WHERE user_roles.user_id = users.id) AS roles
`;

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const result = await this.db.query(
      `SELECT ${userColumns}, ${userRoles}
       FROM users ORDER BY id`,
    );
    return result.rows;
  }

  async findById(id: number) {
    const result = await this.db.query(
      `SELECT ${userColumns}, ${userRoles}
       FROM users WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  }

  // Used by AuthService during login
  async findByEmailWithPassword(email: string) {
    const result = await this.db.query(
      `SELECT ${userColumns},
              password_hash AS "passwordHash"
       FROM users
       WHERE lower(email) = lower($1)`,
      [email],
    );
    return result.rows[0];
  }

  // Used by AuthService during registration
  async createWithPassword(user: NewUser, passwordHash: string) {
    const result = await this.db.query(
      `WITH new_user AS (
         INSERT INTO users
           (first_name, last_name, email, age, password_hash)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING ${userColumns}
       ), default_role AS (
         INSERT INTO user_roles (user_id, role_id)
         SELECT new_user.id, roles.id
         FROM new_user JOIN roles ON roles.is_default
       )
       SELECT * FROM new_user`,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.age ?? null,
        passwordHash,
      ],
    );
    return result.rows[0];
  }

  async create(user: UserDto) {
    const result = await this.db.query<{ id: number }>(
      `WITH new_user AS (
         INSERT INTO users
           (first_name, last_name, email, age)
         VALUES ($1, $2, $3, $4)
         RETURNING id
       ), default_role AS (
         INSERT INTO user_roles (user_id, role_id)
         SELECT new_user.id, roles.id
         FROM new_user JOIN roles ON roles.is_default
       )
       SELECT id FROM new_user`,
      [user.firstName, user.lastName, user.email, user.age ?? null],
    );

    return this.findById(result.rows[0].id);
  }

  async update(id: number, user: UserDto) {
    const result = await this.db.query<{ id: number }>(
      `UPDATE users
       SET first_name = $1,
           last_name = $2,
           email = $3,
           age = $4
       WHERE id = $5
       RETURNING id`,
      [user.firstName, user.lastName, user.email, user.age ?? null, id],
    );

    if (!result.rows[0]) return undefined;
    return this.findById(id);
  }

  async remove(id: number) {
    const result = await this.db.query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING id`,
      [id],
    );

    return result.rows[0];
  }
}
