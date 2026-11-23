import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { SequelizeExceptionFilter } from './common/sequelize-exception.filter.js';
import { DatabaseModule } from './database/database.module.js';

import { PermissionsGuard } from './permissions/permissions.guard.js';
import { PermissionsModule } from './permissions/permissions.module.js';

import { RolesModule } from './roles/roles.module.js';

import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,

    PermissionsModule,
    UsersModule,
    RolesModule,
  ],
  providers: [
    // global guards run in this order: who are you (401), then are you allowed (403)

    { provide: APP_GUARD, useExisting: PermissionsGuard },
    { provide: APP_FILTER, useClass: SequelizeExceptionFilter },
  ],
})
export class AppModule {}
