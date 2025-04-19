import { Dialect, Sequelize } from 'sequelize';
import RoleModel from './role.model.js';
import UserModel from './user.model.js';

interface DB {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  user: ReturnType<typeof UserModel>;
  role: ReturnType<typeof RoleModel>;
  ROLES: string[];
}

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || '5', 10),
      min: parseInt(process.env.DB_POOL_MIN || '0', 10),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
      idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10),
    },
  }
);

const db: DB = {
  Sequelize,
  sequelize,
  user: UserModel(sequelize),
  role: RoleModel(sequelize),
  ROLES: ['user', 'admin', 'moderator'],
};

// Define relationships
db.role.belongsToMany(db.user, { through: 'user_roles' });
db.user.belongsToMany(db.role, { through: 'user_roles', as: 'roles' });

export default db;
