import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// every model is registered here so associations between modules resolve.
// each feature module still uses SequelizeModule.forFeature() for the models it injects

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT') ?? 5432),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),

        // the tables already exist (api/sql/*.sql); never let sequelize change them
        synchronize: false,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
