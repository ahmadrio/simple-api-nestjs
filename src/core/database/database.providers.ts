import * as dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { User } from "src/modules/users/user.entity";
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from "../constants";
import { databaseConfig } from "./database.config";

dotenv.config();

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;

      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;

        case TEST:
          config = databaseConfig.test;
          break;

        case PRODUCTION:
          config = databaseConfig.production;
          break;

        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);
      sequelize.addModels([User]);

      await sequelize.sync({
        force: process.env.DB_OPTION_FORCE === 'true'
      });

      return sequelize;
    }
  }
];
